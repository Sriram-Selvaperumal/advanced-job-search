document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchForm = document.getElementById('searchForm');
    const urlPreview = document.getElementById('urlPreview');
    const searchBtn = document.getElementById('searchBtn');
    const copyBtn = document.getElementById('copyBtn');
    const postedTimeType = document.getElementById('postedTimeType');
    const postedStandard = document.getElementById('postedStandard');
    const postedMinutes = document.getElementById('postedMinutes');
    const minutesUnit = document.querySelector('.unit');

    // State Constants
    const BASE_URL = 'https://www.linkedin.com/jobs/search/';

    // --- specialized mappings ---
    // LinkedIn uses undocumented IDs for some filters, but we can often use standard codes or keywords
    // f_TPR (Time Posted Range) calculation is key for "minutes" functionality.

    // --- Event Listeners ---

    // Toggle between Standard and Custom Minutes
    postedTimeType.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            postedStandard.classList.add('hidden');
            postedStandard.classList.remove('active');
            postedMinutes.classList.remove('hidden');
            postedMinutes.classList.add('active');
            minutesUnit.classList.remove('hidden');
        } else {
            postedStandard.classList.remove('hidden');
            postedStandard.classList.add('active');
            postedMinutes.classList.add('hidden');
            postedMinutes.classList.remove('active');
            minutesUnit.classList.add('hidden');
        }
        updateUrl();
    });

    // Add listeners to all inputs to update preview real-time
    const inputs = searchForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateUrl);
        input.addEventListener('change', updateUrl);
    });

    // Search Button Click
    searchBtn.addEventListener('click', () => {
        const url = generateUrl();
        window.open(url, '_blank');
    });

    // Copy Button Click
    copyBtn.addEventListener('click', () => {
        const url = generateUrl();
        navigator.clipboard.writeText(url).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });

    // Initial update
    updateUrl();

    // --- Core Logic ---

    function updateUrl() {
        const url = generateUrl();
        urlPreview.textContent = url;
    }

    function generateUrl() {
        const params = new URLSearchParams();

        // 1. Keywords & Boolean Logic
        let keywordTerms = [];

        // Base Keywords
        const rawKeywords = document.getElementById('keywords').value.trim();
        if (rawKeywords) {
            // If user typed boolean operators, trust them, otherwise just add it
            keywordTerms.push(rawKeywords);
        }

        // Company Name
        const companyName = document.getElementById('companyName').value.trim();
        if (companyName) {
            keywordTerms.push(`"${companyName}"`);
        }

        // Product-Based Company Preset (Heuristic)
        if (document.getElementById('productCompanies').checked) {
            keywordTerms.push('(SaaS OR Product OR Technology OR Software)');
        }

        // Exclusions (NOT terms)
        let exclusions = [];
        const excludeText = document.getElementById('excludeKeywords').value.trim();
        if (excludeText) {
            const terms = excludeText.split(',').map(t => t.trim()).filter(t => t);
            if (terms.length > 0) {
                // Formatting: NOT (term1 OR term2)
                exclusions.push(`NOT (${terms.join(' OR ')})`);
            }
        }

        // Smart Block: Consultancies
        if (document.getElementById('blockConsultancies').checked) {
            exclusions.push('NOT ("recruitment agency" OR "staffing" OR "consulting" OR "recruiting for client" OR "hiring for client")');
        }

        // Smart Block: Referrals
        if (document.getElementById('excludeReferrals').checked) {
            exclusions.push('NOT ("referral" OR "referral required")');
        }

        // Combine keywords
        let finalKeywords = keywordTerms.join(' AND ');
        if (exclusions.length > 0) {
            finalKeywords += (finalKeywords ? ' ' : '') + exclusions.join(' ');
        }

        if (finalKeywords) {
            params.append('keywords', finalKeywords);
        }

        // 2. Location
        const location = document.getElementById('location').value.trim();
        if (location) {
            params.append('location', location);
        }

        // 3. Geo ID
        const geoId = document.getElementById('geoId').value;
        if (geoId) {
            params.append('geoId', geoId);
        }

        // 4. Time Posted (f_TPR)
        // Format: rSECONDS (e.g. r600 = 10 mins)
        const timeType = document.getElementById('postedTimeType').value;
        if (timeType === 'standard') {
            const stdVal = document.getElementById('postedStandard').value;
            if (stdVal) params.append('f_TPR', stdVal);
        } else {
            const minutes = document.getElementById('postedMinutes').value;
            if (minutes && minutes > 0) {
                const seconds = minutes * 60;
                params.append('f_TPR', `r${seconds}`);
            }
        }

        // 5. Job Type (f_JT)
        const f_JT = document.getElementById('f_JT').value;
        if (f_JT) params.append('f_JT', f_JT);

        // 6. Experience Level (f_E)
        // Multi-select
        const f_E = Array.from(document.getElementById('f_E').selectedOptions).map(opt => opt.value);
        if (f_E.length > 0) {
            params.append('f_E', f_E.join(','));
        }

        // 7. Workplace Type (f_WT)
        const f_WT = document.getElementById('f_WT').value;
        if (f_WT) params.append('f_WT', f_WT);

        // 8. Salary Bucket (f_SB2)
        const f_SB2 = document.getElementById('f_SB2').value;
        if (f_SB2) params.append('f_SB2', f_SB2);

        // 9. Company Size (f_C)
        // This is heuristic mapping based on common IDs. 
        // Standard mapping: B=1-10, C=11-50, D=51-200, E=201-500, F=501-1000, G=1001-5000, H=5001-10000, I=10000+
        const f_C = Array.from(document.getElementById('companySize').selectedOptions).map(opt => opt.value);
        if (f_C.length > 0) {
            params.append('f_C', f_C.join(','));
        }

        // 10. Easy Apply
        const easyApply = document.getElementById('easyApply').value;
        if (easyApply === 'true') {
            params.append('f_AL', 'true');
        }

        // Always sort by Date Posted (DD) for "freshness" tools
        params.append('sortBy', 'DD');

        // Construct final URL
        // decodeURIComponent is not used here because URLSearchParams encodes automatically.
        // However, we want to show a readable preview, but the actual link needs to be encoded.
        // The browser handles encoding when opening the link.

        return `${BASE_URL}?${params.toString()}`;
    }
});
