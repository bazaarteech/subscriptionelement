
document.addEventListener("DOMContentLoaded", function () {
    const applyTranslations = (data, lang) => {
        try {
            const subscriptionTitle = document.getElementById('subscriptionTitle');
            const addToCartButton = document.getElementById('addToCartButton');

            if (subscriptionTitle) {
                subscriptionTitle.textContent = data[lang]?.subscriptionTitle || "Default Title";
            }
            if (addToCartButton) {
                addToCartButton.textContent = data[lang]?.addToCartButton || "Add to Cart";
            }
        } catch (error) {
            console.error("Error applying translations:", error);
        }
    };

    const fetchAndStoreTranslations = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/bazaarteech/subscriptionplans/main/subscriptionplans.json');
            const data = await response.json();
            localStorage.setItem('translations', JSON.stringify({
                data: data,
                timestamp: Date.now()  // Store timestamp to check freshness
            }));
            return data;
        } catch (error) {
            console.error("Error fetching translations:", error);
            throw error;
        }
    };

    const getUserLang = (userCountry) => {
        const langMapping = {
            ar: ['MA', 'SA', 'AE', 'DZ', 'TN', 'KW', 'QA', 'OM', 'BH', 'EG', 'IQ', 'SY', 'JO', 'LB', 'PS', 'LY', 'SD', 'DJ', 'SO', 'SS'],
            es: ['CR', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'GT', 'EC', 'BO', 'PY', 'UY', 'CU', 'DO', 'SV', 'NI', 'HN', 'PR', 'GQ', 'PA', 'ES'],
            en: ['US', 'GB', 'CA', 'AU', 'IE', 'NZ', 'ZA', 'IN', 'NG', 'PK', 'PH', 'SG', 'JM', 'MT', 'BB', 'TT', 'GH', 'ZM', 'BS', 'BZ', 'GD', 'HN', 'KN', 'LC', 'VC', 'SL', 'MW', 'ZW', 'KE', 'UG', 'SS', 'MU', 'MV', 'FJ', 'MM', 'NP', 'KR', 'JP', 'IL', 'HK', 'ET', 'ER', 'CY', 'BN', 'AO', 'BD', 'VU', 'TZ', 'LK', 'SC', 'WS', 'RW', 'DK', 'NO', 'RU', 'TR', 'IT', 'DE', 'NL', 'TH', 'BY', 'HR', 'AT', 'BG', 'RO', 'FI', 'IS', 'KZ', 'DM', 'GY', 'VG', 'TV'],
            fr: ['FR', 'CD', 'BE', 'CH', 'LU', 'CI', 'SN', 'CM', 'GN', 'BF', 'NE', 'TD', 'CF', 'RW', 'NC', 'CK', 'BJ', 'BI', 'KM', 'CG', 'ML', 'SC']
        };

        for (const [lang, countries] of Object.entries(langMapping)) {
            if (countries.includes(userCountry)) {
                return lang;
            }
        }
        return 'ar'; // Default to Arabic
    };

    const initTranslations = async () => {
        const loader = document.getElementById('loader'); // Assuming there's a loader element in the HTML
        if (loader) loader.style.display = 'block'; // Show loading indicator

        try {
            const storedTranslations = localStorage.getItem('translations');
            const currentTime = Date.now();

            // Check if the stored translations are fresh (e.g., older than 24 hours)
            const translations = storedTranslations
                ? JSON.parse(storedTranslations)
                : await fetchAndStoreTranslations();

            if (translations.timestamp && currentTime - translations.timestamp > 86400000) { // 24 hours
                console.log('Translations are outdated. Fetching new data.');
                return await fetchAndStoreTranslations();
            }

            const ipResponse = await fetch('https://ipinfo.io/json?token=7026faa1150bfd');
            const ipData = await ipResponse.json();
            const userLang = getUserLang(ipData.country);

            applyTranslations(translations.data, userLang);
        } catch (error) {
            console.error("Initialization error:", error);
        } finally {
            if (loader) loader.style.display = 'none'; // Hide loading indicator
        }
    };

    initTranslations();
});
              
