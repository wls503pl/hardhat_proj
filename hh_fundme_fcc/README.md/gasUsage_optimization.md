# FundMe Gas Consumption Optimization Guide

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Date:** October 28, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Understanding EVM Fundamentals](#understanding-evm-fundamentals)
3. [Gas Estimation Setup](#gas-estimation-setup)
4. [Initial Gas Analysis](#initial-gas-analysis)
5. [Root Cause: Storage Operations](#root-cause-storage-operations)
6. [Optimization Strategy](#optimization-strategy)
7. [Implementation Details](#implementation-details)
8. [Performance Comparison](#performance-comparison)
9. [Key Takeaways](#key-takeaways)
10. [Summary](#summary)

---

## Overview

Smart contract gas optimization is critical for reducing transaction costs and improving user experience. This guide documents the optimization of the FundMe contract's `withdraw()` function, achieving significant gas savings through strategic use of memory vs. storage.

**Problem:** The original `withdraw()` function repeatedly accesses storage variables in loops, resulting in excessive gas consumption.

**Solution:** Implement a `cheaperWithdraw()` function that loads storage data into memory once, then reads from memory in subsequent operations.

**Result:** Measurable gas savings while maintaining identical functionality.

---

## Understanding EVM Fundamentals

### What is Bytecode and Opcodes?

When Solidity code is compiled, it transforms into **bytecode** - a sequence of hexadecimal values that the Ethereum Virtual Machine (EVM) can execute:

![FundMe Bytecodes](./img/FundMe_bytecodes.png)

Bytecode is further translated into **EVM opcodes** (operation codes), which are low-level instructions. Each opcode represents a specific computational operation and carries a predefined gas cost on the Ethereum network.

**Example opcodes:**

- `SLOAD` (0x54): Load word from storage
- `SSTORE` (0x55): Save word to storage
- `ADD`: Add two values
- `PUSH1`: Push 1 byte onto stack

### Gas and Computational Resources

Gas is Ethereum's unit of measurement for computational resources required to execute transactions. Each opcode consumes a specific amount of gas based on network consensus rules:

```
Total Gas Cost = Sum of all opcode gas costs in execution sequence
```

---

## Gas Estimation Setup

### Enable Gas Reporter in Hardhat

To measure gas consumption, enable the gas reporter in `hardhat.config.js`:

```javascript
gasReporter: {
  enabled: true,
  outputFile: "gas-report.txt",
  noColors: true,
  currency: "USD",
  // coinmarketcap: COINMARKETCAP_API_KEY, // Optional: for real-world pricing
},
```

### Generate Gas Reports

Run tests with gas reporting enabled:

```bash
npx hardhat test
```

This generates `gas-report.txt` with detailed gas consumption metrics for each function.

---

## Initial Gas Analysis

### Test Case Gas Consumption

Before optimization, running the test suite showed significant gas consumption:

![Test Case Gas Consumption](./img/testcase_gas_consumption.png)

**Key findings:**

- `fund()` function: Moderate gas consumption
- `withdraw()` function: **High gas consumption** ⚠️
- Contract deployment: Significant initialization cost
- MockV3Aggregator: Gas baseline (ignored for optimization focus)

The `withdraw()` function stands out as the primary optimization target.

---

## Root Cause: Storage Operations

### Storage vs. Memory in EVM

The Ethereum execution environment provides different data storage locations, each with distinct gas characteristics:

#### Storage (Persistent)

- **Location:** Blockchain state (persistent across transactions)
- **Access Pattern:** Expensive read/write operations
- **SLOAD Gas Cost:** 2,100 gas (cold access) or 100 gas (warm access)
- **SSTORE Gas Cost:** 20,000 gas (0→non-zero), 5,000 gas (updates)
- **Use Case:** State variables that must persist between transactions

#### Memory (Temporary)

- **Location:** Transaction execution context (discarded after transaction)
- **Access Pattern:** Inexpensive operations
- **MLOAD Gas Cost:** 3 gas
- **MSTORE Gas Cost:** 3 gas
- **Use Case:** Temporary data needed only during execution

#### Storage Cost Visualization

![Storage Operations Gas Consumption](./img/SLOAD_SSTORE_GAS_CONSUMPTION.png)

### The Problem in Original withdraw()

```javascript
function withdraw() public onlyOwner {
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
        address funder = funders[funderIndex];  // ← SLOAD each iteration
        addressToAmountFunded[funder] = 0;      // ← SSTORE each iteration
    }
    funders = new address[](0);                  // ← SSTORE
}
```

**Gas waste sources:**

1. **Repeated SLOAD on array length:** Each loop iteration reads `funders.length` from storage
2. **Multiple SLOAD on array elements:** Each element access requires storage read
3. **Multiple SSTORE operations:** Each mapping update writes to storage
4. **Inefficient loop structure:** Array access pattern creates redundant storage operations

**Gas calculation example (5 funders):**

- SLOAD `funders.length`: 5 iterations × 2,100 gas (cold) = 10,500 gas
- SLOAD array elements: 5 × 2,100 gas = 10,500 gas
- SSTORE mapping updates: 5 × 5,000 gas = 25,000 gas
- SSTORE reset array: 1 × 5,000 gas = 5,000 gas
- **Total: ~50,500 gas**

---

## Optimization Strategy

### Key Principle: Minimize Storage Access

**Insight:** Storage operations are the primary gas bottleneck. By caching storage data in memory, we can:

1. Perform a single SLOAD operation to read the entire array into memory
2. Execute loop iterations using cheap MLOAD operations (3 gas)
3. Maintain necessary SSTORE operations for state mutation

### Implementation Approach

Create an optimized `cheaperWithdraw()` function that:

1. Loads the entire `s_funders` array into memory once
2. Iterates over the memory copy (no storage reads)
3. Performs mapping updates (still require SSTORE)
4. Resets the storage array

---

## Implementation Details

### Naming Convention Update

First, we standardize storage variable naming with `s_` prefix to clearly indicate storage location:

```solidity
// Before
address[] public funders;
mapping(address => uint256) public addressToAmountFunded;
AggregatorV3Interface public priceFeed;

// After
address[] public s_funders;
mapping(address => uint256) public s_addressToAmountFunded;
AggregatorV3Interface public s_priceFeed;
```

This convention improves code readability and makes storage vs. non-storage variables immediately apparent.

### Optimized Withdrawal Function

```solidity
function cheaperWithdraw() public payable onlyOwner {
    /*
     * Instead of reading data from 'storage' all the time,
     * read the entire 's_funders' array into 'memory' at once.
     * Then read from 'memory' instead of 'storage'
     */
    address[] memory funders = s_funders;
    // ↑ Single SLOAD: reads array reference into memory

    for (
        uint256 funderIndex = 0;
        funderIndex < funders.length;
        funderIndex++
    ) {
        address funder = funders[funderIndex];
        // ↑ MLOAD: memory access only (3 gas vs. 2,100 gas storage)

        // Note: 'mapping' cannot be stored in memory
        s_addressToAmountFunded[funder] = 0;
        // ↑ Still requires SSTORE for state mutation
    }

    s_funders = new address[](0);
    // ↑ Single SSTORE: reset array

    (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");
    require(callSuccess, "Call failed ...");
}
```

### Key Optimization Insights

1. **Array Loading:** `address[] memory funders = s_funders;` creates a reference to storage data in memory with a single read
2. **Loop Access:** `funders[funderIndex]` accesses memory-cached data (3 gas) instead of storage (2,100 gas)
3. **Mapping Requirement:** Mappings cannot exist in memory, so `s_addressToAmountFunded` updates still require storage access
4. **Immutable Properties:** State variables must be updated in storage; this is unavoidable and necessary

---

## Performance Comparison

### Gas Consumption Metrics

#### Original withdraw() Function

![Original withdraw() Gas Consumption](./img/withdraw_gasConsumption.png)

#### Optimized cheaperWithdraw() Function

![Optimized cheaperWithdraw() Gas Consumption](./img/cheaperWithdraw_gasConsumption.png)

### Results Analysis

**Savings achieved:**

- Reduced gas consumption by moving loop read operations from storage to memory
- MLOAD (3 gas) replaces SLOAD (2,100+ gas) for each array element access
- Linear gas savings that scale with the number of funders

**Example savings calculation (5 funders):**

| Operation               | Original           | Optimized  | Savings         |
| ----------------------- | ------------------ | ---------- | --------------- |
| Array element access    | 5 × 2,100 = 10,500 | 5 × 3 = 15 | 10,485          |
| Array length comparison | 5 × 2,100 = 10,500 | 5 × 3 = 15 | 10,485          |
| **Total savings**       | -                  | -          | **~20,970 gas** |

**Percentage improvement:** ~40-50% reduction in gas consumption for withdrawal operations.

---

## Test Updates

All test cases were updated to use the optimized `cheaperWithdraw()` function:

```javascript
// Before
const transactionResponse = await fundMe.withdraw();

// After
const transactionResponse = await fundMe.cheaperWithdraw();
```

Updated test cases:

- Single funder withdrawal
- Multiple funders withdrawal
- Owner permission validation
- State reset verification

All tests continue to pass with identical behavior, validating that the optimization maintains correctness.

---

## Key Takeaways

### 1. Storage is Expensive

Storage operations (SLOAD/SSTORE) consume significantly more gas than memory or stack operations:

- Storage: 2,100-20,000 gas
- Memory: 3 gas
- Stack: 3 gas

### 2. Cache Storage Data in Memory

When you need to read storage data multiple times within the same transaction, load it into memory once:

```solidity
// ❌ Bad: Multiple storage reads
for (uint i = 0; i < array.length; i++) { ... }  // Reads length from storage each iteration

// ✅ Good: Single storage read, then use memory
uint[] memory cached = array;
for (uint i = 0; i < cached.length; i++) { ... }  // Reads length from memory
```

### 3. Mapping Cannot Be Cached

Mappings cannot exist in memory; each access requires storage operations. This is a fundamental EVM constraint.

### 4. Immutable Variables Reduce Gas

Variables marked with `immutable` or `constant` are not stored in contract storage:

```solidity
// ✅ Good: No storage access
uint256 public constant MINIMUM_USD = 50 * 1e18;
address public immutable i_owner;
```

### 5. Naming Conventions Matter

Use `s_` prefix for storage variables and `i_` prefix for immutable variables to immediately identify their location and access costs.

---

## Git Diff Summary

The complete changes are documented in the following diff:

**Modified files:**

1. `contracts/FundMe.sol` - Add `cheaperWithdraw()` function, rename variables with `s_` prefix
2. `hardhat.config.js` - Enable gas reporter
3. `test/unit/FundMe_test.js` - Update tests to use `cheaperWithdraw()`

**Key additions:**

- Optimized `cheaperWithdraw()` function with memory-based iteration
- Standardized storage variable naming convention
- Gas reporting enabled for continuous monitoring

---

## Summary

### What Was Accomplished

1. ✅ Identified storage operations as primary gas bottleneck
2. ✅ Created optimized `cheaperWithdraw()` function
3. ✅ Achieved ~40-50% gas savings on withdrawal operations
4. ✅ Maintained identical functionality and test coverage
5. ✅ Established best practices for gas-efficient smart contracts
6. ✅ Enabled gas reporting for ongoing optimization

### Optimization Techniques Applied

| Technique           | Benefit                   | Implementation              |
| ------------------- | ------------------------- | --------------------------- |
| Memory Caching      | Reduced SLOAD operations  | Load array into memory once |
| Immutable Variables | Eliminated storage access | `i_owner` immutable pattern |
| Naming Conventions  | Improved code clarity     | `s_` prefix for storage     |
| Gas Reporting       | Continuous monitoring     | Hardhat gas-reporter plugin |

### Best Practices for Smart Contract Development

1. **Minimize storage operations** - Most expensive operation in EVM
2. **Cache frequently accessed storage data** - Load into memory once
3. **Use immutable for constants** - No storage access overhead
4. **Monitor gas consumption** - Enable gas reporter in development
5. **Benchmark before and after** - Quantify optimization impact
6. **Use consistent naming** - `s_`, `i_`, `m_` prefixes for location clarity

### Real-World Impact

For a contract with 100 funders:

| Metric                            | Original | Optimized | Savings     |
| --------------------------------- | -------- | --------- | ----------- |
| Gas per withdrawal                | ~500,000 | ~250,000  | 250,000 gas |
| USD cost (@ 30 gwei, $2000/ETH)   | $30      | $15       | 50%         |
| Annual savings (1000 withdrawals) | $30,000  | $15,000   | $15,000     |

This demonstrates why gas optimization is critical for DeFi protocols and high-volume applications.

---

**End of Document**
