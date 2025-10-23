// const { ethers } = require("hardhat");
// const { expect, assert } = require("chai");
import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

// describle("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    // let simpleStorageFactory, simpleStorage;
    let simpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        // Deploy contract "SimpleStorage" before testing
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as unknown as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment();
    });

    it("Should start with a 'favoriteNumber' of value '5'.", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectValue = "5";
        /*
         * Compare two values ​​using 'assert' or 'expect', both of which can be imported from a package called 'chai'.
         * Here we use the built-in 'equal' function of assert. Remember to conveimport { SimpleStorage__factory } from './../typechain-types/factories/SimpleStorage__factory';
rt the currentValue type from 'BigNumber' to 'String'.
         */
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
