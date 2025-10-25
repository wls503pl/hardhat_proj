// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./PriceConverter.sol";

error NotOwner();

/*
 * Functionality:
 * Get funds from Users, withdraw funds, set a minimum funding value in USD
 */
contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18; // The conversion basis is wei

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    // If you only want the contract owner to call the withdraw function,
    // you can specify who is the owner of the contract in the contract constructor
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        // Make priceFeed modular and variable, with the value depending on the chain
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        // Set a minimum fund amount in USD
        // 1. How do we send ETH to this contract ?
        // Question: value represent ETH, if we want to know it's real value represented by US Dollar
        // we should use Decentralized Oracle like Chainlink
        // msg.value.getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed):
        // "msg.value" will be considered as the first parameter passed into the "getConversionRate" function
        require(
            /*getConversionRate(msg.value)*/ msg.value.getConversionRate(
                priceFeed
            ) >= MINIMUM_USD,
            "Didn't send enough USD ..."
        ); // at list $50
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    modifier onlyOwner() {
        // require(i_owner == msg.sender, "Owner is not Sender.");
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        // reset the funder array
        funders = new address[](0);
        /*
         * actually withdraw the funds: 3 ways
         * msg.sender = address
         * payable(msg.sender) = payable address,
         * msg.sender is the address of caller calling this contract
         * and this represents current contract FundMe
         */

        /*
         * transfer:
         * Transfer has a fee cap of 2300 gas. If this value is exceeded or fails for other reasons, the transaction will be rolled back automaticly.
         */
        //payable(msg.sender).transfer(address(this).balance);

        /*
         * send：
         * 'send' function returns a bool value, true if the call is successful and false if it fails. Transaction failure will not be rolled back.
         */
        //bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require will let transaction roll back.
        //require(sendSuccess, "Send failed ...");

        // call, returns 2 values (bool, bytes) , this Method is the most Recommended to send tokens
        (bool callSuccess /*bytes memory dataReturned*/, ) = payable(msg.sender)
            .call{value: address(this).balance}("");
        require(callSuccess, "Call failed ...");
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
