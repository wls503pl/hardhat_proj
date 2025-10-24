// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() internal view returns (uint256) {
        /*
         * Need ABI
         * Site for AggregatorV3Interface:
         * https://github.com/smartcontractkit/chainlink/blob/contracts-v1.3.0/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol
         * Import it into this contract
         */

        /*
         * Need Address: search it in https://docs.chain.link/data-feeds/price-feeds/addresses?page=1&testnetPage=1#ethereum-mainnet.
         * Find "Sepolia Testnet", ETH/USD address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
         */
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();

        /*
         * Notice: msg.value represents Wei, 1ETH = 1e18 Weis
         * price contains 8 decimal places, like: 366688888888 means $3666.88888888
         * The conversion should be as follows:
         */
        return uint256(price * 1e10); // or 1**100

        /*
         * In AggregatorV3Interface.sol: function latestRoundData's return value, answer: uint256 will return the lastest price.
         */
    }

    function getVersion() internal view returns (uint256) {
        return
            AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306)
                .version();
    }

    function getConversionRate(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}
