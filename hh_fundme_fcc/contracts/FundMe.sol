// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./PriceConverter.sol";

error FundMe_NotOwner();

/** @title A contract for crowd funding
 *  @author Peile Wu
 *  @notice This contract is to demo a sample funding contract
 *  @dev This implements price feeds as our library
 */
contract FundMe {
    /** Type Declarations */
    using PriceConverter for uint256;

    // The conversion basis is wei, decrease it for limitis ETH in Account
    uint256 public constant MINIMUM_USD = 0.05 * 1e18;

    /** State Variables */
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;

    address private immutable i_owner;

    AggregatorV3Interface private s_priceFeed;

    // If you only want the contract owner to call the withdraw function,
    // you can specify who is the owner of the contract in the contract constructor
    constructor(address s_priceFeedAddress) {
        i_owner = msg.sender;
        // Make s_priceFeed modular and variable, with the value depending on the chain
        s_priceFeed = AggregatorV3Interface(s_priceFeedAddress);
    }

    function fund() public payable {
        // Set a minimum fund amount in USD
        // 1. How do we send ETH to this contract ?
        // Question: value represent ETH, if we want to know it's real value represented by US Dollar
        // we should use Decentralized Oracle like Chainlink
        // msg.value.getConversionRate(uint256 ethAmount, AggregatorV3Interface s_priceFeed):
        // "msg.value" will be considered as the first parameter passed into the "getConversionRate" function
        require(
            /*getConversionRate(msg.value)*/ msg.value.getConversionRate(
                s_priceFeed
            ) >= MINIMUM_USD,
            "Didn't send enough USD ..."
        ); // at list $50
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] += msg.value;
    }

    /** Modifier */
    modifier onlyOwner() {
        // require(i_owner == msg.sender, "Owner is not Sender.");
        if (msg.sender != i_owner) {
            revert FundMe_NotOwner();
        }
        _;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        // reset the funder array
        s_funders = new address[](0);
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

    function cheaperWithdraw() public payable onlyOwner {
        /*
         * Instead of reading data from 'storage' all the time,
         * read the entire 's_funders' array into 'memory' at once.
         * Then read from 'memory' instead of 'storage'
         */
        address[] memory funders = s_funders;

        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            // Note: 'mapping' cannot be stored in memory
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");
        require(callSuccess, "Call failed ...");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
