//import { ethers } from "./ethers-6.7.esm.min.js";
//import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers.js/6.7.0/ethers.esm.min.js";
import * as ethers from "./ethers-6.7.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

console.log(ethers);

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        connectButton.innerHTML = "Connected!";
    } else {
        connectButton.innerHTML = "Please Install Metamask.";
    }
}

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.formatEther(balance));
    }
}

async function fund(ethAmount) {
    ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        /*
         * What we need to send a transaction:
         * provider: connection to the blockchain
         * signer: someone's wallet with some gas
         * contract that we are interacting with: need ABI & address
         */
        // BrowserProvider(ether-v6) receives the HTTP endpoint and imports it into ethers.
        // Here, we find the HTTP endpoint from Metamask and use it as the provider.
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Since the provider is connected to Metamask, the signer can be obtained directly.
        // To be precise, it refers to the account on Metamask. If it's account1, then account1 is the signer.
        const signer = await provider.getSigner();
        //console.log(signer);
        // Create a contract object
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Create transaction
        try {
            const transactionResponse = await contract.fund({
                value: ethers.parseEther(ethAmount),
            });
            // listen for the tx to be mined
            await listenForTransactionMine(transactionResponse, provider);
            console.log("Done!");
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash} ...`);
    /*
     * Listen for this transaction to finish.
     * Use provider.once to trigger event only once.
     * Once "provider.once" sees a transaction hash, it will pass a 'transactionReceipt' parameter to the listener function.
     * Once 'transactionResponse' completes, 'transactionReceipt' is obtained.
     */

    // Use Promise, it will execute when the listener finishes listening.
    // Once the listener has finished listening, it runs "resolve" and this Promise is only resolved when the `transactionResponse` is triggered.
    // if a timeout of a certain type occurs, it chooses to reject the request using "reject".
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations.`
            );
            resolve();
        });
    });
}

// withdraw
async function withdraw() {
    if (typeof window.ethereum != "undefined") {
        console.log("Withdrawing ...");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMine(transactionResponse, provider);
        } catch (error) {
            console.log(error);
        }
    }
}
