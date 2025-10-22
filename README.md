# Hardhat Learning Projects

A collection of Solidity smart contract projects built with Hardhat, designed for learning blockchain development.

**Author:** Peile Wu  
**Email:** peile.wu.1990@gmail.com  
**Last Updated:** October 22, 2025

---

## Overview

This repository contains multiple Hardhat projects exploring different aspects of smart contract development. Each project is self-contained with its own documentation and configuration.

## Projects

### Project 1: Hardhat_SimpleStorage (hh_ss_fcc/)

A foundational Hardhat project demonstrating the complete development workflow:

- Contract creation, compilation, and deployment
- Local development with Hardhat network
- Sepolia testnet deployment and verification
- Custom Hardhat tasks
- Hardhat Console for interactive development
- Contract testing with Mocha/Chai framework
- Gas analysis and code coverage measurement

**Full Documentation:** [hh_ss_fcc.md](./hh_ss_fcc/hh_ss_fcc.md)  
**Testing Guide:** [hardhat_test.md](./hardhat_test.md)

---

## Quick Start

1. Clone and install:

```bash
git clone https://github.com/your-username/hardhat_proj.git
cd hardhat_proj/hh_ss_fcc
yarn install
```

2. Compile contracts:

```bash
yarn hardhat compile
```

3. Deploy locally:

```bash
yarn hardhat run scripts/deploy.js
```

## Core Commands

| Command                                                | Purpose                           |
| ------------------------------------------------------ | --------------------------------- |
| `yarn hardhat compile`                                 | Compile contracts                 |
| `yarn hardhat run scripts/deploy.js`                   | Deploy to local network           |
| `yarn hardhat run scripts/deploy.js --network sepolia` | Deploy to Sepolia testnet         |
| `yarn hardhat test`                                    | Run test suite with gas reporting |
| `yarn hardhat test --grep "keyword"`                   | Run specific tests                |
| `yarn hardhat coverage`                                | Measure test coverage             |
| `yarn hardhat node`                                    | Start local node                  |
| `yarn hardhat console --network localhost`             | Interactive console               |
| `yarn hardhat verify --network sepolia <address>`      | Verify on Etherscan               |

## Prerequisites

- Node.js: v22.10.0
- Yarn: v1.22.22
- Git: v2.44.0.windows.1

## Environment Setup

Create `.env` file for testnet deployment:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_test_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

⚠️ **Never commit `.env` files. Use test wallets with minimal funds only.**

## Key Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Chainlist](https://chainlist.org/)

## Project Structure

```
hh_ss_fcc/
├── contracts/           # Smart contracts
├── scripts/             # Deployment scripts
├── tasks/               # Custom Hardhat tasks
├── test/                # Test files (Mocha/Chai)
├── hardhat.config.js    # Hardhat configuration
├── .env                 # Environment variables (not in repo)
└── hh_ss_fcc.md         # Full project documentation
```

## Security & Testing

Testing is essential for smart contract security. Smart contract code is publicly available on the blockchain and exposed to potential exploitation. Comprehensive testing is your first line of defense.

### Running Tests

Write tests in the `test/` directory using Mocha/Chai framework:

```bash
yarn hardhat test                    # Run all tests
yarn hardhat test --grep "keyword"   # Run specific tests
```

### Analyzing Performance

**Gas Reporting:** See how much gas each function consumes:

```bash
yarn hardhat test  # Automatically displays gas usage
```

Configure gas reporting in `hardhat.config.js` with USD conversion using CoinMarketCap API.

**Code Coverage:** Measure how much of your contract is tested:

```bash
yarn hardhat coverage  # Generate coverage report
```

Target 80-90% coverage for production contracts.

### Test Best Practices

- Use descriptive test names that explain what is being validated
- Keep tests focused and atomic (one assertion per concept)
- Use `beforeEach()` to avoid code duplication
- Test edge cases and boundary conditions
- Verify state changes correctly
- Always convert BigNumber to strings before assertions

For detailed testing guidance, see [hardhat_test.md](./hardhat_test.md), which includes:

- Mocha/Chai framework concepts
- Running tests with `--grep` and `.only` flags
- Gas reporting configuration
- Code coverage analysis
- Learning from rekt.news security failures

## License

MIT

---

**Note:** For educational purposes. Always validate on testnet before mainnet deployment.
