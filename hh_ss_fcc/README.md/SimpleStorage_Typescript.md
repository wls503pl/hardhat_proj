# Converting SimpleStorage Project to TypeScript

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Date:** October 23, 2025

---

## Overview

This guide walks you through converting a JavaScript-based Hardhat project to TypeScript. By the end, your smart contract project will have full type safety and better IDE support.

---

## Step 1: Install Required Dependencies

Run this command to install all TypeScript-related packages:

```bash
yarn add @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node @types/mocha ts-node typechain typescript
```

These packages provide:

-   **TypeChain**: Generates TypeScript types for your smart contracts
-   **ts-node**: Runs TypeScript files directly
-   **@types/\***: Type definitions for various libraries

---

## Step 2: Create TypeScript Configuration File

Create a `tsconfig.json` file in your project root with this configuration:

```json
{
    "compilerOptions": {
        "target": "es2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "outDir": "dist"
    },
    "include": ["./scripts", "./test"],
    "files": ["./hardhat.config.ts"]
}
```

This tells TypeScript how to compile your files and what files to include.

---

## Step 3: Convert Files to TypeScript

1. Rename all `.js` files to `.ts` files:

    - `hardhat.config.js` → `hardhat.config.ts`
    - `scripts/deploy.js` → `scripts/deploy.ts`
    - `tasks/block-number.js` → `tasks/block-number.ts`
    - `test/test-deploy.js` → `test/test-deploy.ts`

2. Replace all `require()` statements with `import` statements

**Before:**

```javascript
const { ethers } = require("hardhat");
```

**After:**

```typescript
import { ethers } from "hardhat";
```

![TypeScript setup completed](https://raw.githubusercontent.com/placeholder/typescript_passed.png)

---

## Step 4: Generate Contract Types with TypeChain

TypeChain automatically creates TypeScript types for your smart contracts. This is the key to type safety!

### Why TypeChain?

Without TypeChain, your contract is just a generic `Contract` type. TypeScript doesn't know what functions it has. With TypeChain, you get a specific `SimpleStorage` type that knows all available functions and their parameters.

### Generate the Types

Run this command:

```bash
yarn hardhat typechain
```

This creates a `typechain-types` directory containing all your contract types.

![TypeChain task ready](https://raw.githubusercontent.com/placeholder/typechain.png)

---

## Step 5: Update Your Test File

Now use the generated types in your test file:

```typescript
import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as unknown as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment();
    });

    it("Should start with a 'favoriteNumber' of value '5'.", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectValue = "5";
        assert.equal(currentValue.toString(), expectValue);
    });

    it("Should update when we call store", async () => {
        const expectValue = "618";
        const transactionResponse = await simpleStorage.store(expectValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        expect(currentValue.toString()).to.equal(expectValue);
    });
});
```

---

## Understanding the Type Casting: `as unknown as SimpleStorage__factory`

### What's happening here?

```typescript
simpleStorageFactory = (await ethers.getContractFactory(
    "SimpleStorage"
)) as unknown as SimpleStorage__factory;
```

This looks weird, but there's a good reason:

**The Problem:**

-   `ethers.getContractFactory()` returns a generic `ethers.ContractFactory` type
-   ethers.js can't figure out at compile time that you want a `SimpleStorage__factory` type specifically
-   TypeScript won't let you directly cast from `ContractFactory` to `SimpleStorage__factory`

**The Solution:**

1. First, cast to `unknown` (meaning "I don't know what type this is")
2. Then cast to `SimpleStorage__factory` (meaning "now I'm telling TypeScript what it really is")

This is a workaround for ethers.js's type system limitations—not a bug in your code!

**In Plain English:** "TypeScript, I know this looks generic, but trust me—at runtime this IS a SimpleStorage\_\_factory, so let me work with it that way."

---

## File Structure After Migration

```
project-root/
├── hardhat.config.ts         ← Converted to TypeScript
├── tsconfig.json             ← New TypeScript config
├── typechain-types/          ← Auto-generated by TypeChain
│   ├── SimpleStorage.ts      ← Your contract type
│   ├── factories/
│   └── index.ts
├── scripts/
│   └── deploy.ts             ← Converted to TypeScript
├── tasks/
│   └── block-number.ts       ← Converted to TypeScript
├── test/
│   └── test-deploy.ts        ← Converted to TypeScript
└── node_modules/
```

---

## Verification

After completing these steps, run:

```bash
yarn hardhat test
```

If everything works, your project is now fully TypeScript-based with proper type safety! 🎉
