# Hardhat Learning Projects

A collection of Solidity smart contract projects built with Hardhat, designed for learning blockchain development.

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Last Updated:** October 29, 2025

---

## Overview

This repository contains educational Hardhat projects exploring different aspects of smart contract development. Each project is self-contained with comprehensive documentation organized in the `README.md/` directory.

---

## Project 1: Hardhat_SimpleStorage (hh_ss_fcc/)

A foundational project demonstrating the complete development workflow with full TypeScript support:

**Core Features:**

- Smart contract creation, compilation, and deployment to local/testnet networks
- Sepolia testnet deployment with contract verification on Etherscan
- Custom Hardhat tasks for chain interaction
- Interactive development with Hardhat Console
- Comprehensive testing with Mocha/Chai framework
- Gas cost analysis and code coverage measurement
- TypeScript support with TypeChain for type-safe contract interaction

**Documentation** (in `README.md/` directory):

- [hh_ss_fcc.md](./README.md/hh_ss_fcc.md) - Core setup, deployment, and verification
- [hardhat_test.md](./README.md/hardhat_test.md) - Testing, gas reporting, and coverage
- [SimpleStorage_Typescript.md](./README.md/SimpleStorage_Typescript.md) - TypeScript migration

---

## Project 2: Hardhat_FundMe (hh_fundme_fcc/)

A DeFi-focused project demonstrating professional smart contract development with real-world patterns:

**Core Features:**

- ETH collection with USD price validation using Chainlink oracles
- Professional deployment management with hardhat-deploy
- Dual testing strategy: unit tests (local) + staging tests (testnet)
- Multi-chain deployment (Hardhat, Sepolia)
- Advanced gas optimization techniques (memory caching, visibility optimization)
- Manual interaction scripts for contract operations
- Near-complete code coverage and gas analysis

**Key Concepts:**

- **Modular Architecture:** Separate deploy scripts, tests, and utility functions
- **Price Feed Integration:** Real oracle data with mock fallback for testing
- **Test Isolation:** Mock contracts for local testing without external dependencies
- **Deployment Tracking:** Automatic deployment record management across networks
- **Gas Optimization:** 45-60% total gas reduction through strategic refactoring

**Documentation** (in `README.md/` directory):

- [hardhat_fundMe.md](./README.md/hardhat_fundMe.md) - Setup, hardhat-deploy fundamentals, deployment scripts
- [testForFundMe.md](./README.md/testForFundMe.md) - Unit tests, staging tests, test patterns
- [Mock_FundMe.md](./README.md/Mock_FundMe.md) - Detailed test cases with multiple funders and permission testing
- [gasUsage_optimization.md](./README.md/gasUsage_optimization.md) - Gas optimization strategies (Phase 1 & 2)

**Project Structure:**

```
hh_fundme_fcc/
├── contracts/
│   ├── FundMe.sol           # Main funding contract
│   ├── PriceConverter.sol    # Library for price conversion
│   └── test/
│       └── MockV3Aggregator.sol
├── deploy/
│   ├── 00-deploy-mocks.js   # Deploy mock price feed
│   └── 01-deploy-fundme.js  # Deploy FundMe contract
├── scripts/
│   ├── fund.js              # Send ETH to contract
│   └── withdraw.js          # Withdraw funds
├── test/
│   ├── unit/
│   │   └── FundMe_test.js   # Local unit tests
│   └── staging/
│       └── FundMe_staging.test.js  # Testnet tests
├── img/                     # Screenshots and diagrams
├── hardhat.config.js
├── helper-hardhat-config.js # Network and chain configuration
└── package.json
```

---

## Quick Start

### Project 1: SimpleStorage

```bash
cd hh_ss_fcc

# Install dependencies
yarn install

# Compile contracts
yarn hardhat compile

# Run tests
yarn hardhat test

# Deploy to Sepolia testnet
yarn hardhat run scripts/deploy.ts --network sepolia
```

### Project 2: FundMe

```bash
cd hh_fundme_fcc

# Install dependencies
npm install --legacy-peer-deps

# Compile contracts
npx hardhat compile

# Run unit tests (local)
npx hardhat test

# Run staging tests (testnet)
npx hardhat test --network sepolia

# Deploy to local node
npx hardhat node  # Terminal 1

# In another terminal
npx hardhat run scripts/fund.js --network localhost
npx hardhat run scripts/withdraw.js --network localhost
```

---

## Essential Commands

### Compilation & Testing

| Command                             | Purpose               |
| ----------------------------------- | --------------------- |
| `npx hardhat compile`               | Compile contracts     |
| `npx hardhat test`                  | Run all tests         |
| `npx hardhat test --grep "keyword"` | Run specific tests    |
| `npx hardhat coverage`              | Measure test coverage |

### Deployment & Interaction

| Command                                          | Purpose                      |
| ------------------------------------------------ | ---------------------------- |
| `npx hardhat deploy`                             | Run all deploy scripts       |
| `npx hardhat deploy --tags fundme`               | Deploy tagged contracts only |
| `npx hardhat run scripts/fund.js`                | Execute fund script          |
| `npx hardhat node`                               | Start local development node |
| `npx hardhat verify --network sepolia <address>` | Verify on Etherscan          |

### Network Configuration

| Network   | ChainID  | Use Case              |
| --------- | -------- | --------------------- |
| Hardhat   | 31337    | Local testing         |
| Localhost | 31337    | Local development     |
| Sepolia   | 11155111 | Testnet testing       |
| Mainnet   | 1        | Production (careful!) |

---

## Setup for Testnet Deployment

Create `.env` file in project root:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_test_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

⚠️ **Never commit `.env`. Use test wallets with minimal funds only.**

---

## Key Learning Outcomes

### Project 1: SimpleStorage

- Basic Solidity development workflow
- Contract deployment and verification
- Testing and gas analysis
- TypeScript integration for type safety

### Project 2: FundMe

- **Professional Development:**

  - Multi-environment deployment (local, testnet, mainnet)
  - Automated deployment tracking with hardhat-deploy
  - Named accounts for better account management

- **Advanced Testing:**

  - Unit tests for local development
  - Staging tests for testnet validation
  - Conditional test execution based on network
  - Mock contracts for isolated testing

- **Gas Optimization:**

  - Storage vs. memory trade-offs
  - Smart contract refactoring for efficiency
  - Gas reporting and analysis
  - Real-world performance metrics (40-50% savings)

- **DeFi Concepts:**
  - Oracle integration (Chainlink price feeds)
  - Fund collection and withdrawal
  - Access control patterns
  - Multi-signature scenarios

---

## Why Testing Matters

Smart contracts are publicly deployed on the blockchain and exposed to anyone. Comprehensive testing is your first line of defense against bugs and exploits. Many projects have failed due to insufficient testing—see [rekt.news](https://rekt.news/) for real examples.

**FundMe project emphasizes:**

- Unit tests with Mocha/Chai framework (local, fast)
- Staging tests on real testnets (realistic environment)
- Gas optimization to reduce deployment and runtime costs
- Code coverage measurement (aim for 80-90%)
- Security validation with permission testing

Refer to [testForFundMe.md](./README.md/testForFundMe.md) for detailed testing practices.

---

## Project Progression

### Recommended Learning Path

1. **Start with SimpleStorage** if you're new to Hardhat

   - Understand basic contract compilation and deployment
   - Learn fundamental testing patterns
   - Get comfortable with hardhat commands

2. **Progress to FundMe** for advanced concepts

   - Multi-contract interactions
   - Oracle integration and price feeds
   - Professional deployment workflows
   - Production-ready testing strategies
   - Gas optimization techniques

3. **Combine knowledge** for real projects
   - Apply testing best practices
   - Optimize gas consumption
   - Deploy across multiple networks
   - Verify contracts on Etherscan

---

## Common Errors & Solutions

### SimpleStorage

- **TypeScript errors:** Run `yarn typechain` to regenerate contract types
- **Network connection failed:** Verify RPC URL in .env file
- **Insufficient gas:** Increase gas limit in hardhat.config.ts

### FundMe

- **hardhat-deploy not found:** Add `require("hardhat-deploy")` to hardhat.config.js
- **Peer dependency errors:** Use `npm install --legacy-peer-deps`
- **Price feed not available:** Check MockV3Aggregator deployment in deploy/00-deploy-mocks.js
- **Staging tests fail:** Ensure testnet ETH balance in PRIVATE_KEY wallet

---

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [rekt.news](https://rekt.news/) - Learn from security failures
- [Chainlist](https://chainlist.org/) - Network configurations
- [Chainlink Docs](https://docs.chain.link/data-feeds) - Oracle integration
- [OpenZeppelin Docs](https://docs.openzeppelin.com/) - Security best practices

---

## Project Statistics

### Project 1: SimpleStorage

- **Contracts:** 1
- **Test Cases:** 7
- **Code Coverage:** >90%
- **Estimated Learning Time:** 2-3 hours

### Project 2: FundMe

- **Contracts:** 3 (FundMe + PriceConverter + MockV3Aggregator)
- **Test Cases:** 12+ (unit + staging)
- **Code Coverage:** 94.74%
- **Gas Savings:** 45-60% optimization
- **Estimated Learning Time:** 4-6 hours

---

## Next Steps

After completing both projects, consider exploring:

- Multi-signature wallets (advanced access control)
- Token contracts (ERC20, ERC721)
- Decentralized exchanges (DEX mechanics)
- Staking and yield farming contracts
- NFT marketplaces
- Governance tokens and DAOs

Each project builds on core concepts learned here. Start simple, test thoroughly, optimize systematically.

Happy learning! 🚀

---

**Note:** These are educational projects. Always test thoroughly on testnet before any mainnet deployment. Use test wallets and minimal funds for development and testing
