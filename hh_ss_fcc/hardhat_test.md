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

![Test Output - Pass](media/testPass_output.png)

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

![Before Each Setup](media/beforeEach.png)

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

![Two Test Cases Passed](media/twoCases_passed.png)

### Run Specific Tests with `--grep`

Filter tests by matching strings in the test description:

```bash
yarn hardhat test --grep "favoriteNumber"
```

![Specified String Matched Test](media/specified_string_matched_test.png)

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

![It Only Run](media/itOnlyRun.png)

---

## Test Failure Example

If an assertion fails, Hardhat provides clear error output:

![Test Failed Output](media/testFailed_output.png)

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

## Conclusion

Testing is not optional—it's essential for smart contract security. By using Hardhat's testing framework with Mocha and Chai, you can verify contract behavior comprehensively before deploying to mainnet. Start small, test thoroughly, and iterate.

For more information, visit the [Hardhat Documentation](https://hardhat.org/docs).

---

_Last updated: October 22, 2025_
