//import { ethers } from "./ethers-6.7.esm.min.js";
//import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers.js/6.7.0/ethers.esm.min.js";
import * as ethers from "./ethers-6.7.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

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

async function fund(ethAmount) {
    ethAmount = "0.01";
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
            console.log(`Transaction sent: ${transactionResponse.hash}`);
            // Waiting for transaction confirmation
            await transactionResponse.wait(1);
            console.log("Transaction confirmed!");
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    }
}

// fund function

// withdraw
