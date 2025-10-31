import { ethers } from "./ethers-6.7.esm.min.js";
//import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers.js/6.7.1/ethers.umd.min.js";

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
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        /*
         * What we need to send a transaction:
         * provider: connection to the blockchain
         * signer: someone's wallet with some gas
         * contract that we are interacting with: need ABI & address
         */
    }
}

// fund function

// withdraw
