// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.2/access/Ownable.sol";

contract Compliant is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Compliant", "CAE") {
        _mint(msg.sender, 5 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
