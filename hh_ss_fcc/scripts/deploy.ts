// import
// const { ethers } = require("hardhat");
import { ethers } from "hardhat";

// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract ...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();

    console.log(`Deployed contract to: ${simpleStorage.target}`);

    const currentValue = await simpleStorage.retrieve();
    console.log(`currentValue is: ${currentValue}`);

    // Update current value
    const transactionResponse = await simpleStorage.store(88888);
    await transactionResponse.wait(1);
    const updateValue = await simpleStorage.retrieve();
    console.log(`updateValue is: ${updateValue}`);
}

// call main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
