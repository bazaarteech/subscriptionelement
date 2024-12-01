document.addEventListener("DOMContentLoaded", function() {
        const applyTranslations = (data, lang) => {
            document.getElementById('subscriptionTitle').textContent = data[lang].subscriptionTitle;

document.getElementById('addToCartButton').textContent = data[lang].addToCartButton;
            document.getElementById('option1').textContent = data[lang].subscriptionOptions[0];
            document.getElementById('option2').textContent = data[lang].subscriptionOptions[1];
            document.getElementById('option3').textContent = data[lang].subscriptionOptions[2];
            document.getElementById('option4').textContent = data[lang].subscriptionOptions[3];
        };

        const fetchAndStoreTranslations = () => {
            return fetch('https://raw.githubusercontent.com/bazaarteech/subscriptionplans/main/subscriptionplans.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('translations', JSON.stringify(data));
                    return data;
                });
        };

        const getUserLang = (userCountry) => {
            if (['MA', 'SA', 'AE', 'DZ', 'TN', 'KW', 'QA', 'OM', 'BH', 'EG', 'IQ', 'SY', 'JO', 'LB', 'PS', 'LY', 'SD', 'DJ', 'SO',  'SS'].includes(userCountry)) {
                return 'ar'; 
            } else if (['CR', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'GT', 'EC', 'BO', 'PY', 'UY', 'CU', 'DO', 'SV', 'NI', 'HN', 'PR', 'GQ', 'PA', 'ES'].includes(userCountry)) {
                return 'es'; 
            } else if (['US', 'GB', 'CA', 'AU', 'IE', 'NZ', 'ZA', 'IN', 'NG', 'PK', 'PH', 'SG', 'JM', 'MT', 'BB', 'TT', 'GH', 'ZM', 'US-KE', 'US-AZ', 'US-FL', 'US-GA', 'US-HI', 'US-KY', 'US-NV', 'US-NJ', 'US-NY', 'US-TX', 'US-VA', 'US-WA', 'US-AK', 'US-LA', 'BS', 'BZ', 'GD', 'HN', 'KN', 'LC', 'VC', 'SL', 'MW', 'ZW', 'KE', 'UG', 'SS', 'MU', 'MV', 'FJ', 'MM', 'NP', 'KR', 'JP', 'IL', 'HK', 'ET', 'ER', 'CY', 'BN', 'AO', 'BD', 'VU', 'TZ', 'LK', 'SC', 'WS', 'LC', 'KN', 'RW', 'DK', 'NO', 'RU', 'TR', 'IT', 'DE', 'NL', 'TH', 'BY', 'HR', 'AT', 'BG', 'RO', 'FI', 'IS', 'KZ', 'DM', 'GY', 'VG', 'TV'].includes(userCountry)) {
                return 'en'; 
            } else if (['FR', 'CD', 'BE', 'CH', 'LU', 'CI', 'SN', 'CM', 'GN', 'BF', 'NE', 'TD', 'CF', 'RW', 'NC', 'CK', 'BJ', 'BI', 'KM', 'CG', 'ML', 'SC'].includes(userCountry)) {
                return 'fr'; 
            } else {
                return 'ar'; 
            }
        };

        const storedTranslations = localStorage.getItem('translations');

        (storedTranslations ? Promise.resolve(JSON.parse(storedTranslations)) : fetchAndStoreTranslations())
            .then(data => fetch('https://ipinfo.io/json?token=7026faa1150bfd'))
            .then(response => response.json())
            .then(ipData => applyTranslations(JSON.parse(localStorage.getItem('translations')), getUserLang(ipData.country)))
            .catch(error => console.error('Error:', error));
    });
