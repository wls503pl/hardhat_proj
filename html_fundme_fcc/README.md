# FundMe dApp - Frontend Setup Guide

**Author:** Peile Wu  
**Contact:** peile.wu.1990@gmail.com  
**Date:** October 30, 2025

## Overview

This guide walks through the process of building a decentralized application (dApp) frontend that connects to the Ethereum blockchain via MetaMask. This project demonstrates the full-stack approach: Smart Contracts (backend) + HTML/JavaScript (frontend).

## Project Structure

```
html_fundme_fcc/
├── index.html
├── index.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Create HTML Structure

In VSCode, create an `index.html` file. You can use the built-in snippet by typing `!` and pressing Enter to generate the basic HTML framework:

```html
<script src="./index.js" type="text/javascript"></script>
<button id="connectButton" onclick="connect()">Connect Wallet</button>
```

![HTML Structure](img/html_structure.png)

### 2. Install Live Server Extension

Install the Live Server extension in VSCode to preview your website in real-time:

![Live Server Extension](img/live_server.png)

Click the "Go Live" button at the bottom of VSCode to start the server:

![Go Live Button](img/go_live.png)

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

![HTTP Server Running](img/run_http_server.png)

### 4. Add JavaScript Functionality

Create an `index.js` file with the connect function:

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
![MetaMask Detected](img/have_metamask_plugin.png)

**Without MetaMask:**
![No MetaMask](img/no_metamask_plugin.png)

## Common Pitfalls & Solutions

### ⚠️ Pitfall 1: Red Flag Error (CSP Violation)

If you see a red flag error when trying to connect:

![Red Flag Error](img/red_flag_error.png)

**Solution:** Try using a different IP address from the available options. For example, use `192.168.50.180:8080` instead of `127.0.0.1:8080`:

![Choose Suitable Address](img/choose_suitable_address.png)

Once connected, the MetaMask popup will appear:

![MetaMask Connected](img/chose_right_address.png)

### ⚠️ Pitfall 2: Browser Cache Issues

If your code changes don't appear after refreshing, the browser may have cached the old version.

**Solution:** Hard refresh to clear the cache:

- Right-click the refresh button
- Select "Empty cache and hard refresh"

![Clear Cache Button](img/clear_cache_button.png)

### ⚠️ Pitfall 3: MetaMask Not Popping Up

**Issue:** The connect function might trigger MetaMask popup on every page load, which can be annoying.

**Solution:** Wrap the connection logic in an async function and attach it to a button click only:

```javascript
async function connect() {
  // Connection code here - only runs on button click
}
```

## Features Implemented

✅ MetaMask detection  
✅ Wallet connection functionality  
✅ Button-triggered connection (no auto-popup on page load)  
✅ Real-time button state update  
✅ Error handling

## Running the Application

1. Start the HTTP server:

   ```bash
   npx http-server -c-1 --cors
   ```

2. Open your browser and navigate to one of the provided URLs (e.g., `http://127.0.0.1:8080`)

3. Click the "Connect Wallet" button

4. Approve the connection in the MetaMask popup

5. Button text will update to "Connected!" upon successful connection

## Next Steps

- Integrate ReactJS/NextJS for more advanced UI
- Implement additional smart contract interactions
- Add wallet balance display
- Build transaction functionality
