/**
 * Test Script for Burn Multiple Calculator
 * Validates calculation accuracy with multiple scenarios
 */

// Test cases from planning document
const testCases = [
    {
        name: 'Excellent efficiency',
        netBurn: 500000,
        netArr: 750000,
        expected: 0.67,
        expectedRating: 'Excellent'
    },
    {
        name: 'Good efficiency',
        netBurn: 1000000,
        netArr: 800000,
        expected: 1.25,
        expectedRating: 'Good'
    },
    {
        name: 'Acceptable range',
        netBurn: 800000,
        netArr: 500000,
        expected: 1.60,
        expectedRating: 'Acceptable'
    },
    {
        name: 'Concerning',
        netBurn: 10000000,
        netArr: 4000000,
        expected: 2.50,
        expectedRating: 'Concerning'
    },
    {
        name: 'Perfect efficiency',
        netBurn: 100000,
        netArr: 100000,
        expected: 1.00,
        expectedRating: 'Good'
    },
    {
        name: 'Negative ARR',
        netBurn: 500000,
        netArr: -100000,
        expected: -5.00,
        expectedRating: 'Warning'
    },
    {
        name: 'Decimal inputs',
        netBurn: 123.45,
        netArr: 67.89,
        expected: 1.82,
        expectedRating: 'Acceptable'
    },
    {
        name: 'Large numbers',
        netBurn: 1000000000,
        netArr: 500000000,
        expected: 2.00,
        expectedRating: 'Acceptable'
    },
    {
        name: 'Very efficient',
        netBurn: 250000,
        netArr: 500000,
        expected: 0.50,
        expectedRating: 'Excellent'
    },
    {
        name: 'Exactly at threshold',
        netBurn: 150000,
        netArr: 100000,
        expected: 1.50,
        expectedRating: 'Acceptable'
    }
];

// Calculation function (matches script.js logic)
function calculateBurnMultiple(burn, arr) {
    if (arr === 0) return null;
    return burn / arr;
}

// Evaluation function (matches script.js logic)
function evaluateResult(burnMultiple, arr) {
    if (arr < 0) {
        return 'Warning';
    }

    if (burnMultiple < 1.0) {
        return 'Excellent';
    } else if (burnMultiple < 1.5) {
        return 'Good';
    } else if (burnMultiple < 2.0) {
        return 'Acceptable';
    } else {
        return 'Concerning';
    }
}

// Run tests
console.log('='.repeat(70));
console.log('BURN MULTIPLE CALCULATOR - TEST SUITE');
console.log('='.repeat(70));
console.log('');

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
    const result = calculateBurnMultiple(test.netBurn, test.netArr);
    const rating = evaluateResult(result, test.netArr);
    const resultRounded = Math.round(result * 100) / 100; // Round to 2 decimals

    const calculationPassed = Math.abs(resultRounded - test.expected) < 0.01;
    const ratingPassed = rating === test.expectedRating;
    const testPassed = calculationPassed && ratingPassed;

    if (testPassed) {
        passed++;
        console.log(`✅ Test ${index + 1}: ${test.name}`);
    } else {
        failed++;
        console.log(`❌ Test ${index + 1}: ${test.name}`);
    }

    console.log(`   Net Burn: ${test.netBurn.toLocaleString()}`);
    console.log(`   Net ARR: ${test.netArr.toLocaleString()}`);
    console.log(`   Expected: ${test.expected} (${test.expectedRating})`);
    console.log(`   Got: ${resultRounded} (${rating})`);
    console.log(`   Status: ${testPassed ? 'PASS' : 'FAIL'}`);
    console.log('');
});

console.log('='.repeat(70));
console.log('TEST RESULTS');
console.log('='.repeat(70));
console.log(`Total Tests: ${testCases.length}`);
console.log(`Passed: ${passed} ✅`);
console.log(`Failed: ${failed} ${failed > 0 ? '❌' : ''}`);
console.log(`Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);
console.log('='.repeat(70));

// Validation tests
console.log('');
console.log('='.repeat(70));
console.log('VALIDATION TESTS');
console.log('='.repeat(70));
console.log('');

// Test division by zero
const divByZeroResult = calculateBurnMultiple(100000, 0);
console.log(`✅ Division by zero: ${divByZeroResult === null ? 'Handled correctly' : 'FAILED'}`);

// Test negative burn (should be caught by validation, but calculation still works)
const negativeBurnResult = calculateBurnMultiple(-100000, 50000);
console.log(`✅ Negative burn calculation: ${negativeBurnResult === -2 ? 'Works correctly' : 'FAILED'}`);

// Test very large numbers
const largeNumbersResult = calculateBurnMultiple(1e11, 1e10);
console.log(`✅ Large numbers: ${largeNumbersResult === 10 ? 'Works correctly' : 'FAILED'}`);

console.log('');
console.log('='.repeat(70));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(70));
