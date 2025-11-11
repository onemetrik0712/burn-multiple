/**
 * Burn Multiple Calculator - JavaScript
 * Calculation logic, validation, and interactivity
 * IIFE wrapped to prevent global scope pollution
 */

(function() {
    'use strict';

    /* ========================================================================
       CONSTANTS & CONFIGURATION
       ====================================================================== */

    const CURRENCIES = [
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
        { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
        { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' }
    ];

    const MAX_VALUE = 1e12; // 1 trillion
    const MIN_VALUE = -1e12; // Negative 1 trillion

    const RESULT_THRESHOLDS = {
        excellent: 1.0,
        good: 1.5,
        acceptable: 2.0
    };

    /* ========================================================================
       DOM ELEMENT REFERENCES (Cached)
       ====================================================================== */

    let elements = {};

    /* ========================================================================
       STATE MANAGEMENT
       ====================================================================== */

    let currentCurrency = 'EUR';

    /* ========================================================================
       VALIDATION FUNCTIONS
       ====================================================================== */

    /**
     * Validates an input value
     * @param {string|number} value - The value to validate
     * @param {string} fieldName - Name of the field ('netBurn' or 'netArr')
     * @returns {Object} {valid: boolean, error: string}
     */
    function validateInput(value, fieldName) {
        // Check if empty
        if (value === '' || value === null || value === undefined) {
            return {
                valid: false,
                error: 'This field is required'
            };
        }

        // Convert to number
        const numValue = parseFloat(value);

        // Check if valid number
        if (isNaN(numValue)) {
            return {
                valid: false,
                error: 'Please enter a valid number'
            };
        }

        // Check for Net Burn specific rules
        if (fieldName === 'netBurn') {
            if (numValue <= 0) {
                return {
                    valid: false,
                    error: 'Net Burn must be greater than zero'
                };
            }

            if (numValue > MAX_VALUE) {
                return {
                    valid: false,
                    error: 'Value exceeds maximum limit'
                };
            }
        }

        // Check for Net New ARR specific rules
        if (fieldName === 'netArr') {
            if (numValue === 0) {
                return {
                    valid: false,
                    error: 'Net New ARR cannot be zero'
                };
            }

            if (numValue > MAX_VALUE || numValue < MIN_VALUE) {
                return {
                    valid: false,
                    error: 'Value exceeds maximum limit'
                };
            }
        }

        return {
            valid: true,
            error: ''
        };
    }

    /**
     * Validates all form inputs
     * @returns {Object} {valid: boolean, errors: Object}
     */
    function validateForm() {
        const burnValue = elements.netBurnInput.value;
        const arrValue = elements.netArrInput.value;

        const burnValidation = validateInput(burnValue, 'netBurn');
        const arrValidation = validateInput(arrValue, 'netArr');

        return {
            valid: burnValidation.valid && arrValidation.valid,
            errors: {
                burn: burnValidation.error,
                arr: arrValidation.error
            }
        };
    }

    /* ========================================================================
       CALCULATION ENGINE
       ====================================================================== */

    /**
     * Calculates the Burn Multiple
     * Formula: Burn Multiple = Net Burn ÷ Net New ARR
     * @param {number} burn - Net Burn amount
     * @param {number} arr - Net New ARR amount
     * @returns {number|null} The calculated burn multiple or null if invalid
     */
    function calculateBurnMultiple(burn, arr) {
        // Prevent division by zero (should be caught by validation)
        if (arr === 0) {
            return null;
        }

        // Calculate burn multiple
        const result = burn / arr;

        return result;
    }

    /**
     * Formats a number for display
     * @param {number} num - Number to format
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted number
     */
    function formatNumber(num, decimals = 2) {
        return num.toFixed(decimals);
    }

    /**
     * Formats currency value
     * @param {number} value - Value to format
     * @param {string} currencyCode - Currency code
     * @returns {string} Formatted currency string
     */
    function formatCurrency(value, currencyCode) {
        const currency = CURRENCIES.find(c => c.code === currencyCode);
        const symbol = currency ? currency.symbol : '';

        // Format with thousand separators
        const formatted = Math.abs(value).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        return `${symbol}${formatted}`;
    }

    /* ========================================================================
       RESULT EVALUATION
       ====================================================================== */

    /**
     * Determines the result classification based on burn multiple value
     * @param {number} burnMultiple - Calculated burn multiple
     * @param {number} arr - Net New ARR (to check for negative growth)
     * @returns {Object} Classification details
     */
    function evaluateResult(burnMultiple, arr) {
        // Handle negative ARR (warning state)
        if (arr < 0) {
            return {
                class: 'bmc-result--warning',
                label: 'Warning',
                description: 'Negative ARR growth detected while burning cash'
            };
        }

        // Classify based on thresholds
        if (burnMultiple < RESULT_THRESHOLDS.excellent) {
            return {
                class: 'bmc-result--excellent',
                label: 'Excellent',
                description: 'Highly capital efficient - You\'re spending less than $1 to generate $1 of ARR'
            };
        } else if (burnMultiple < RESULT_THRESHOLDS.good) {
            return {
                class: 'bmc-result--good',
                label: 'Good',
                description: 'Healthy growth - Your capital efficiency is within good industry standards'
            };
        } else if (burnMultiple < RESULT_THRESHOLDS.acceptable) {
            return {
                class: 'bmc-result--acceptable',
                label: 'Acceptable',
                description: 'Monitor closely - You\'re burning a moderate amount per ARR dollar'
            };
        } else {
            return {
                class: 'bmc-result--concerning',
                label: 'Concerning',
                description: 'High burn rate - You\'re spending significantly more than industry benchmarks'
            };
        }
    }

    /* ========================================================================
       UI UPDATE FUNCTIONS
       ====================================================================== */

    /**
     * Displays the calculation result
     * @param {number} result - Burn multiple result
     * @param {number} burn - Net Burn value
     * @param {number} arr - Net New ARR value
     */
    function displayResult(result, burn, arr) {
        const evaluation = evaluateResult(result, arr);
        const formattedResult = formatNumber(Math.abs(result), 2);
        const formattedBurn = formatCurrency(burn, currentCurrency);
        const formattedArr = formatCurrency(arr, currentCurrency);

        // Build result HTML
        const resultHTML = `
            <div class="bmc-result__value">${formattedResult}</div>
            <div class="bmc-result__label">${evaluation.label}</div>
            <p class="bmc-result__description">${evaluation.description}</p>
            <p class="bmc-result__details">
                Burning ${formattedBurn} to generate ${formattedArr} in new ARR
            </p>
        `;

        // Update result container
        elements.resultContainer.innerHTML = resultHTML;
        elements.resultContainer.className = `bmc-result ${evaluation.class}`;
        elements.resultContainer.style.display = 'block';

        // Update ARIA for screen readers
        elements.resultContainer.setAttribute('aria-label',
            `Burn Multiple result: ${formattedResult}. Status: ${evaluation.label}. ${evaluation.description}`
        );
    }

    /**
     * Displays an error message in the result container
     * @param {string} message - Error message to display
     */
    function displayError(message) {
        const errorHTML = `
            <div class="bmc-result__value">⚠️</div>
            <div class="bmc-result__label">Error</div>
            <p class="bmc-result__description">${message}</p>
        `;

        elements.resultContainer.innerHTML = errorHTML;
        elements.resultContainer.className = 'bmc-result bmc-result--error';
        elements.resultContainer.style.display = 'block';

        // Update ARIA for screen readers
        elements.resultContainer.setAttribute('aria-label', `Error: ${message}`);
    }

    /**
     * Clears the result display
     */
    function clearResult() {
        elements.resultContainer.style.display = 'none';
        elements.resultContainer.innerHTML = '';
    }

    /**
     * Shows validation error for a specific field
     * @param {string} field - Field name ('burn' or 'arr')
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        if (field === 'burn') {
            elements.burnError.textContent = message;
            elements.netBurnInput.setAttribute('aria-invalid', 'true');
            elements.netBurnInput.classList.add('bmc-input--invalid');
        } else if (field === 'arr') {
            elements.arrError.textContent = message;
            elements.netArrInput.setAttribute('aria-invalid', 'true');
            elements.netArrInput.classList.add('bmc-input--invalid');
        }
    }

    /**
     * Clears validation error for a specific field
     * @param {string} field - Field name ('burn' or 'arr')
     */
    function clearFieldError(field) {
        if (field === 'burn') {
            elements.burnError.textContent = '';
            elements.netBurnInput.setAttribute('aria-invalid', 'false');
            elements.netBurnInput.classList.remove('bmc-input--invalid');
        } else if (field === 'arr') {
            elements.arrError.textContent = '';
            elements.netArrInput.setAttribute('aria-invalid', 'false');
            elements.netArrInput.classList.remove('bmc-input--invalid');
        }
    }

    /**
     * Updates currency symbols in input prefixes
     * @param {string} currencyCode - Currency code
     */
    function updateCurrencySymbols(currencyCode) {
        const currency = CURRENCIES.find(c => c.code === currencyCode);

        if (currency) {
            elements.burnPrefix.textContent = currency.symbol;
            elements.arrPrefix.textContent = currency.symbol;
            currentCurrency = currencyCode;
        }
    }

    /* ========================================================================
       EVENT HANDLERS
       ====================================================================== */

    /**
     * Handles currency selection change
     * @param {Event} e - Change event
     */
    function handleCurrencyChange(e) {
        const selectedCurrency = e.target.value;
        updateCurrencySymbols(selectedCurrency);
    }

    /**
     * Handles input field changes for real-time validation
     * @param {Event} e - Input event
     */
    function handleInputChange(e) {
        const field = e.target.id === 'bmc-net-burn' ? 'burn' : 'arr';
        const fieldName = e.target.id === 'bmc-net-burn' ? 'netBurn' : 'netArr';
        const value = e.target.value;

        // Clear error when user starts typing
        clearFieldError(field);

        // Validate on blur or if value exists
        if (value !== '') {
            const validation = validateInput(value, fieldName);
            if (!validation.valid) {
                showFieldError(field, validation.error);
            }
        }
    }

    /**
     * Handles form submission
     * @param {Event} e - Submit event
     */
    function handleCalculate(e) {
        e.preventDefault();

        // Clear previous errors
        clearFieldError('burn');
        clearFieldError('arr');

        // Validate form
        const validation = validateForm();

        if (!validation.valid) {
            // Show field-specific errors
            if (validation.errors.burn) {
                showFieldError('burn', validation.errors.burn);
            }
            if (validation.errors.arr) {
                showFieldError('arr', validation.errors.arr);
            }

            clearResult();
            return;
        }

        // Get values
        const burn = parseFloat(elements.netBurnInput.value);
        const arr = parseFloat(elements.netArrInput.value);

        // Calculate burn multiple
        const result = calculateBurnMultiple(burn, arr);

        if (result === null) {
            displayError('Unable to calculate. Please check your inputs.');
            return;
        }

        // Display result
        displayResult(result, burn, arr);

        // Scroll to result on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                elements.resultContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    }

    /* ========================================================================
       INITIALIZATION
       ====================================================================== */

    /**
     * Initializes the calculator
     * - Caches DOM elements
     * - Attaches event listeners
     * - Sets default values
     */
    function init() {
        // Cache DOM elements
        elements = {
            currencySelect: document.getElementById('bmc-currency'),
            netBurnInput: document.getElementById('bmc-net-burn'),
            netArrInput: document.getElementById('bmc-net-arr'),
            burnPrefix: document.getElementById('bmc-burn-prefix'),
            arrPrefix: document.getElementById('bmc-arr-prefix'),
            burnError: document.getElementById('bmc-burn-error'),
            arrError: document.getElementById('bmc-arr-error'),
            calculateBtn: document.querySelector('.bmc-button'),
            resultContainer: document.getElementById('bmc-result-container'),
            form: document.querySelector('.bmc-form')
        };

        // Check if all elements exist
        if (!elements.form) {
            console.error('Burn Multiple Calculator: Required DOM elements not found');
            return;
        }

        // Set default currency
        currentCurrency = elements.currencySelect.value;
        updateCurrencySymbols(currentCurrency);

        // Attach event listeners
        elements.currencySelect.addEventListener('change', handleCurrencyChange);
        elements.netBurnInput.addEventListener('input', handleInputChange);
        elements.netBurnInput.addEventListener('blur', handleInputChange);
        elements.netArrInput.addEventListener('input', handleInputChange);
        elements.netArrInput.addEventListener('blur', handleInputChange);
        elements.form.addEventListener('submit', handleCalculate);

        // Log initialization
        console.log('Burn Multiple Calculator initialized successfully');
    }

    /* ========================================================================
       RUN ON DOM READY
       ====================================================================== */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
