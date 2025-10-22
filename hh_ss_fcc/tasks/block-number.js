const { task } = require("hardhat/config");

/*
 * Use the '.addParam' command to add different parameters to the task
 * Use 'setAction' to define the execution of the task
 */
task("block-number", "Prints the current block number").setAction(
    /*
     * Another syntax for defining a function in Javascript, defining a function without a name
     * .e.g: "const blockTask = async(.., params, ..) => {...}" equals "async function blockTask(...) {...}"
     *
     * Here: Whenever a task is run, 'taskArgs' is automatically passed to the anonymous function.
     * At the same time, the 'hre'(Hardhat Runtime Environment) parameter is passed in, which is similar to "require("hardhat")"
     * in file `deploy.js`.
     */
    async (taskArgs, hre) => {
        /*
         * 'hre' can access many packages that 'hardhat' can access,
         * 'hre.ethers' is like importing 'ethers' from 'hardhat', many functions in the 'ethers' package can be used.
         */
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number is: ${blockNumber}`);
    }
);
