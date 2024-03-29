// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Compliant.sol";

contract Redeem is ERC20("Redeem", "REDM"), Ownable, ERC20Burnable {
    Compliant public compliantToken;  // Reference to the ItemSaleToken contract

    event TokensRedeemed(address indexed seller, uint256 amount);

    constructor(address _compliantTokenAddress) {
        compliantToken = Compliant(_compliantTokenAddress);
    }

    // Compliant user uses tokens as a redeem points
    function redeem(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(compliantToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");

        // todo: implement the total tax payable here.

        emit TokensRedeemed(msg.sender, tokenAmount);
    }

    // Tax Collector can burn the received tokens
    function burnTokens(uint256 tokenAmount) external onlyOwner {
        compliantToken.burn(tokenAmount); // Burn the tokens using the Compliant function

        emit TokensRedeemed(owner(), tokenAmount);
    }

    // todo: remove me
    // Owner can withdraw any remaining tokens in the contract (if needed)
    function withdrawTokens(uint256 tokenAmount) external onlyOwner {
        require(compliantToken.transfer(owner(), tokenAmount), "Token transfer failed");
    }
}
