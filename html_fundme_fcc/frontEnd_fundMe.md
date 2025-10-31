# FundMe dApp - Frontend Setup Guide

**Author:** Peile Wu  
**Contact:** peile.wu.1990@gmail.com  
**Date:** October 31, 2025

## Overview

This guide walks through the process of building a decentralized application (dApp) frontend that connects to the Ethereum blockchain via MetaMask. This project demonstrates the full-stack approach: Smart Contracts (backend) + HTML/JavaScript (frontend).

## Project Structure

```
html_fundme_fcc/
├── index.html
├── index.js
├── ethers-6.7.esm.min.js
├── package.json
└── frontEnd_fundMe.md
```

## Setup Instructions

### 1. Create HTML Structure

In VSCode, create an `index.html` file. You can use the built-in snippet by typing `!` and pressing Enter to generate the basic HTML framework:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FundMe dApp</title>
    </head>
    <body>
        Hello, Metamask
        <script src="./index.js" type="module"></script>
        <button id="connectButton">Connect Wallet</button>
        <button id="fundButton">Fund</button>
    </body>
</html>
```

**Important:** Set the script type to `module` to enable ES6 imports:

```html
<script src="./index.js" type="module"></script>
```

![HTML Structure](img/html_js/html_structure.png)

### 2. Install Live Server Extension

Install the Live Server extension in VSCode to preview your website in real-time:

![Live Server Extension](img/html_js/live_server.png)

Click the "Go Live" button at the bottom of VSCode to start the server:

![Go Live Button](img/html_js/go_live.png)

### 3. Set Up HTTP Server with npm

Install the http-server package to run your application:

```bash
npm install --save-dev http-server --legacy-peer-deps
```

Then stop Live Server and run:

```bash
npx http-server -c-1 --cors
```

This will display available URLs:

![HTTP Server Running](img/html_js/run_http_server.png)

### 4. Add JavaScript Functionality

Create an `index.js` file with the connect function and button event listeners:

```javascript
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        document.getElementById("connectButton").innerHTML = "Connected!";
    } else {
        document.getElementById("connectButton").innerHTML =
            "Please Install Metamask.";
    }
}

async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}...`);

    if (typeof window.ethereum !== "undefined") {
        /*
         * Sending transactions requires:
         * - Blockchain connection provider
         * - Signer (user with sufficient gas)
         * - Contract interaction (ABI and address)
         */
    }
}

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

connectButton.onclick = connect;
fundButton.onclick = fund;
```

### 5. Check MetaMask Installation

To verify MetaMask is installed, check for the `window.ethereum` object:

```javascript
if (typeof window.ethereum !== "undefined") {
    console.log("I see a Metamask!");
} else {
    console.log("No Metamask.");
}
```

**With MetaMask installed:**
![MetaMask Detected](img/html_js/have_metamask_plugin.png)

**Without MetaMask:**
![No MetaMask](img/html_js/no_metamask_plugin.png)

## Importing Ethers.js Library

### Using CDN Import (Recommended)

In `index.js`, import ethers from the CDN:

```javascript
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers.js/6.7.1/ethers.umd.min.js";
```

This approach avoids the need to manage node_modules and provides a direct browser-compatible version of ethers.

![Importing ESM in Browser](img/html_js2/importing_ESM_inBrowser.png)

### Verifying Ethers Import

You can verify the ethers library is loaded by logging it to the console:

```javascript
console.log(ethers);
```

Refresh the page and check the console to see all available ethers APIs:

![Show Inner of Ethers](img/html_js2/show_innerOfEthers.png)

## Common Pitfalls & Solutions

### ⚠️ Pitfall 1: Red Flag Error (CSP Violation)

If you see a red flag error when trying to connect:

![Red Flag Error](img/html_js/red_flag_error.png)

**Solution:** Try using a different IP address from the available options. For example, use `192.168.50.180:8080` instead of `127.0.0.1:8080`:

![Choose Suitable Address](img/html_js/choose_suitable_address.png)

Once connected, the MetaMask popup will appear:

![MetaMask Connected](img/html_js/chose_right_address.png)

### ⚠️ Pitfall 2: Browser Cache Issues

If your code changes don't appear after refreshing, the browser may have cached the old version.

**Solution:** Hard refresh to clear the cache:

-   Right-click the refresh button
-   Select "Empty cache and hard refresh"

### ⚠️ Pitfall 3: MetaMask Not Popping Up

**Issue:** The connect function might trigger MetaMask popup on every page load, which can be annoying.

**Solution:** Wrap the connection logic in an async function and attach it to a button click only by using event listener assignment:

```javascript
const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
```

This ensures the connection only triggers when the button is clicked, not on page load.

### ⚠️ Pitfall 4: HTTP Server Started in Wrong Directory

**Issue:** After restarting http-server, you experience various errors on the webpage.

**Solution:** Ensure you run the http-server command from the project's root directory:

```bash
npx http-server -c-1 --cors
```

![Must Run HTTP Server in Root](img/html_js2/mustRun_httpServer_inRoot.png)

After confirming the correct directory, reload the webpage as needed:

![Reload Web as Needed](img/html_js2/reloadWeb_asNeed.png)

### ⚠️ Pitfall 5: Button Not Responding to Clicks

**Issue:** Buttons don't trigger functions after restructuring code.

**Solution:** When moving functions from inline onclick handlers to event listeners, ensure buttons have proper IDs and the event listeners are set up correctly:

```html
<button id="connectButton">Connect Wallet</button>
<button id="fundButton">Fund</button>
```

```javascript
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

connectButton.onclick = connect;
fundButton.onclick = fund;
```

![Buttons Errors](img/html_js2/buttons_errors.png)

## Features Implemented

✅ MetaMask detection  
✅ Wallet connection functionality  
✅ Button-triggered connection (no auto-popup on page load)  
✅ Real-time button state update  
✅ Error handling  
✅ Ethers.js library integration  
✅ Fund function framework

## Running the Application

1. Ensure you're in the project root directory

2. Start the HTTP server:

    ```bash
    npx http-server -c-1 --cors
    ```

3. Open your browser and navigate to one of the provided URLs (e.g., `http://192.168.50.180:8080`)

4. Click the "Connect Wallet" button

5. Approve the connection in the MetaMask popup

6. Button text will update to "Connected!" upon successful connection

## Next Steps

-   Integrate ethers.js provider and signer for transaction handling
-   Implement fund() function with smart contract interactions
-   Add wallet balance display
-   Build complete transaction functionality
-   Consider upgrading to ReactJS/NextJS for more advanced UI
