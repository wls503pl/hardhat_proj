const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describle("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage;

    beforeEach(async function () {
        // Deploy contract "SimpleStorage" before testing
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a 'favoriteNumber' of value '5'.", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectValue = "5";
        /*
         * Compare two values ​​using 'assert' or 'expect', both of which can be imported from a package called 'chai'.
         * Here we use the built-in 'equal' function of assert. Remember to convert the currentValue type from 'BigNumber' to 'String'.
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
