---
Author: Peile Wu
Contact: peile.wu.1990@gmail.com
Date: October 22, 2025
---

# Hardhat Security and Testing Guide

## Why We Must Test: Learning from rekt.news

Visit [**rekt.news**](https://rekt.news/) — an independent media outlet dedicated to covering hacks, exploits, regulatory failures, and scams in the crypto industry. It archives a comprehensive history of security breaches and attack methodologies that have cost projects millions.

![rekt.news Leaderboard](media/rektNewsLeaderboard.png)

### rekt.news Philosophy

**rekt.news** is not a promotional platform. Instead, it specializes in exposing:

-   Who got hacked and why
-   What went wrong
-   How attacks were executed
-   The systemic failures that enabled exploitation

The site's motto captures it perfectly: _"Decentralization is a meme. We rent sovereignty."_ — highlighting how inadequate security practices undermine blockchain's promise.

### The Message

Countless projects listed on rekt.news failed because they **skipped proper testing and security audits**. Every hack, every lost user fund, every collapsed protocol could have been prevented with rigorous testing and code review.

**This is why testing matters.** Writing robust tests is our first line of defense against vulnerabilities and exploitation.

## Introduction

Smart contract code is publicly available and exposed to interaction from all parties. Testing is not optional—it's the barrier between secure code and becoming the next rekt.news headline. This guide demonstrates how to effectively test Solidity contracts using Hardhat and the Mocha testing framework.

---

## Why Testing Matters

Contract security depends on rigorous testing. Since smart contract code operates transparently on the blockchain and can be exploited by anyone, comprehensive test coverage is essential to:

-   Verify contract behavior before deployment
-   Catch bugs and edge cases early
-   Ensure state transitions work as intended
-   Prevent costly security incidents

---

## Hardhat Testing Framework

Hardhat uses **Mocha** as its testing framework, which is based on JavaScript. Tests are written in `.js` files within the `test/` directory.

### Basic Setup

First, clean your artifacts and cache:

```bash
yarn hardhat clean
```

Create a test file `test/test-deploy.js`:

```javascript
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
    let simpleStorage;

    beforeEach(async function () {
        // Deploy contract before each test
        const SimpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
        );
        simpleStorage = await SimpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment();
    });

    it("Should start with a 'favoriteNumber' of value '5'", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectValue = "5";
        assert.equal(currentValue.toString(), expectValue);
    });

    it("Should update when we call store", async () => {
        const expectValue = "618";
        const transactionResponse = await simpleStorage.store(expectValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectValue);
    });
});
```

![Test Output - Pass](media/hardhat_test/testPass_output.png)

---

## Key Mocha Concepts

### `describe()` Block

The `describe()` function groups related tests together. It accepts two parameters:

-   **First parameter**: A descriptive string (e.g., "SimpleStorage")
-   **Second parameter**: A callback function containing test logic

```javascript
describe("SimpleStorage", function () {
    // Test cases go here
});
```

### `beforeEach()` Hook

Runs before each test case. Commonly used to deploy contracts and initialize state:

```javascript
beforeEach(async function () {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
});
```

![Before Each Setup](media/hardhat_test/beforeEach.png)

### `it()` Block

Defines individual test cases. Accepts two parameters:

-   **First parameter**: A descriptive string explaining what the test validates
-   **Second parameter**: An async function containing the test logic

```javascript
it("Should start with a 'favoriteNumber' of value '5'", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectValue = "5";
    assert.equal(currentValue.toString(), expectValue);
});
```

### Nested `describe()` Blocks

You can nest `describe()` blocks for better organization:

```javascript
describe("SimpleStorage", function () {
    beforeEach(async function () {
        // Setup code
    });

    describe("Read Operations", () => {
        it("Should retrieve stored value", async () => {
            // Test logic
        });
    });

    describe("Write Operations", () => {
        it("Should update stored value", async () => {
            // Test logic
        });
    });
});
```

---

## Assertions with Chai

Hardhat uses **Chai** for assertions. Import it at the top of your test file:

```javascript
const { expect, assert } = require("chai");
```

### Using `assert`

```javascript
assert.equal(currentValue.toString(), expectValue);
```

**Important**: Convert BigNumber values to strings before comparison:

```javascript
const currentValue = await simpleStorage.retrieve();
const expectValue = "5";
assert.equal(currentValue.toString(), expectValue); // Correct
```

### Using `expect`

Alternative assertion style:

```javascript
expect(currentValue.toString()).to.equal(expectValue);
```

---

## Running Tests

### Run All Tests

```bash
yarn hardhat test
```

![Two Test Cases Passed](media/hardhat_test/twoCases_passed.png)

### Run Specific Tests with `--grep`

Filter tests by matching strings in the test description:

```bash
yarn hardhat test --grep "favoriteNumber"
```

![Specified String Matched Test](media/hardhat_test/specified_string_matched_test.png)

### Run a Single Test with `.only`

Use `it.only()` to run only one specific test:

```javascript
it.only("Should start with a 'favoriteNumber' of value '5'", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectValue = "5";
    assert.equal(currentValue.toString(), expectValue);
});
```

When a test with `.only` is present, Hardhat will skip all other tests and only execute that one:

![It Only Run](media/hardhat_test/itOnlyRun.png)

---

## Test Failure Example

If an assertion fails, Hardhat provides clear error output:

![Test Failed Output](media/hardhat_test/testFailed_output.png)

The error message indicates:

-   Which test failed
-   The expected vs. actual values
-   The line number where the assertion failed

---

## Best Practices

1. **Write descriptive test names**: Use clear language that explains what is being tested
2. **One assertion per concept**: Keep tests focused and atomic
3. **Use beforeEach for setup**: Avoid code duplication across tests
4. **Test edge cases**: Include tests for boundary conditions and error scenarios
5. **Test state changes**: Verify that contract state updates correctly
6. **Clean up between tests**: Use beforeEach to ensure fresh state

---

## Code Formatting Standards

Maintain consistent code style across your test files. Key formatting points:

-   **Indentation**: Use 4 spaces for nested blocks
-   **Async functions**: Always use `async` when dealing with promises
-   **Wait for transactions**: Use `await transactionResponse.wait(1)` to confirm on-chain execution
-   **Variable naming**: Use clear, descriptive names (e.g., `simpleStorage`, `transactionResponse`)

---

# Part 2: Test Analysis and Optimization

## Overview

Beyond running tests, Hardhat provides tools to analyze test performance and code quality. Two key plugins are `hardhat-gas-reporter` (for gas optimization) and `solidity-coverage` (for test coverage analysis). These tools work together to ensure your contracts are both efficient and thoroughly tested.

### Installation

```bash
yarn add --dev hardhat-gas-reporter solidity-coverage
```

### Configuration

Add to `hardhat.config.js`:

```javascript
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
    // ... other config
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
};
```

---

## Gas Reporting

The `hardhat-gas-reporter` plugin attaches to all tests and outputs how much gas each function consumes. This helps optimize contract efficiency and understand transaction costs.

### Basic Usage

Running `yarn hardhat test` will display gas consumption:

![Gas Consumption Report](media/hardhat_gas_reporter/gas_consumption.png)

The report shows:

-   Individual function gas costs
-   Total contract deployment gas
-   Each function's approximate consumption

### Enhanced Configuration with USD Pricing

To convert gas costs to USD, configure a price oracle API in `hardhat.config.js`:

```javascript
gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
},
```

### Getting a CoinMarketCap API Key

1. Visit [CoinMarketCap Pro API](https://pro.coinmarketcap.com/account)
2. Sign up or log in
3. Generate an API key
4. Add to `.env`:

```env
COINMARKETCAP_API_KEY=your_api_key_here
```

### Output Example

Running `yarn hardhat test` generates a `gas-report.txt` file:

![Gas Report TXT Output](media/hardhat_gas_reporter/gas-report_txt.png)

This report includes:

-   Function names and their gas costs
-   Total gas consumption
-   USD conversion (if API is accessible)

### Troubleshooting

If you encounter network timeout warnings:

1. **Enable offline mode** (no USD conversion):

```javascript
gasReporter: {
    enabled: true,
    offline: true,
},
```

2. **Temporarily disable** during development:

```javascript
gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
},
```

### References

-   [hardhat-gas-reporter npm package](https://www.npmjs.com/package/hardhat-gas-reporter)

---

## Code Coverage Analysis

The `solidity-coverage` plugin measures how much of your smart contract code is actually being tested. It identifies untested code paths and helps ensure comprehensive test coverage.

### Running Coverage Analysis

```bash
yarn hardhat coverage
```

This command:

1. Runs all tests
2. Tracks which code lines are executed
3. Generates coverage statistics
4. Creates a `coverage.json` file for further analysis

### Coverage Report

The output displays coverage percentages for different code aspects:

![Solidity Coverage Report](media/solidity_coverage/solidity_coverage.png)

The report shows:

-   **Statements**: Percentage of code lines covered
-   **Branches**: Percentage of conditional branches tested
-   **Functions**: Percentage of functions called
-   **Lines**: Specific line numbers not covered by tests

### Understanding Coverage

If the report shows:

-   33.33% statements covered
-   50% functions covered
-   40% lines covered

This means:

-   Only about one-third of your code's logic is being executed during tests
-   Half of your functions are never called in the test suite
-   Specific lines (25, 29, 30) are not being tested

### Best Practices

1. **Aim for high coverage**: Target at least 80-90% coverage for production contracts
2. **Focus on critical paths**: Prioritize testing high-risk functions
3. **Test edge cases**: Ensure coverage includes boundary conditions and error scenarios
4. **Review uncovered code**: Understand why certain lines aren't tested
5. **Iterate**: Write tests to increase coverage incrementally

### Coverage Artifacts

The `coverage.json` file generated can be used with coverage visualization tools and CI/CD pipelines to track coverage trends over time.

---

## Complete Testing Workflow

The integrated approach combines all three tools:

1. **Write tests** with Mocha/Chai
2. **Run tests** and verify functionality
3. **Analyze gas costs** with `yarn hardhat test`
4. **Measure coverage** with `yarn hardhat coverage`
5. **Iterate** until confident in contract security and efficiency

---

## Conclusion

Testing is not optional—it's essential for smart contract security. By using Hardhat's testing framework with Mocha and Chai, combined with gas reporting and coverage analysis, you can verify contract behavior comprehensively before deploying to mainnet.

The complete testing workflow:

1. **Write tests** with Mocha/Chai
2. **Run tests** and verify functionality
3. **Analyze gas costs** with gas-reporter
4. **Measure coverage** with solidity-coverage
5. **Iterate** until confident in contract security

Start small, test thoroughly, and iterate.

For more information, visit the [Hardhat Documentation](https://hardhat.org/docs).

---

_Last updated: October 22, 2025_
