// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Compliant is ERC20("Compliant", "CAE"), Ownable {
    // Mapping to store the item type and its fixed price
    mapping(string => uint256) public itemValues;

    // Events to track important contract actions
    event ItemRequested(address indexed disposer, string itemType, string itemName, string description, string itemCategory);
    event MeetingScheduled(address indexed collector, address indexed disposer);
    event ItemVerifiedAndMinted(address indexed collector, string itemType, uint256 amount);

    // Struct to represent a sale request
    struct DisposeRequest {
        address disposer;
        string itemType;
        string itemName;
        string description;
        string itemCategory;
        bool verified;
    }

    // Mapping to store dispose requests by the disposer's address
    mapping(address => DisposeRequest[]) public disposeRequests;

    constructor() {
        // Initialize item prices
        itemValues["TypeA"] = 100; // Set the fixed price for item type A
        itemValues["TypeB"] = 200; // Set the fixed price for item type B
        // Add more item types and prices as needed
    }

    // Function for a disposer to send a request to the collector
    function sendRequest(string memory itemType, string memory itemName, string memory description, string memory itemCategory) external {
        require(itemValues[itemType] > 0, "Invalid item type");
        DisposeRequest memory newRequest = DisposeRequest(msg.sender, itemType, itemName, description, itemCategory, false);
        disposeRequests[msg.sender].push(newRequest);
        emit ItemRequested(msg.sender, itemType, itemName, description, itemCategory);
    }

    // Function for a collector to schedule a meeting
    function scheduleMeeting(address disposer) external {
        for (uint256 i = 0; i < disposeRequests[disposer].length; i++) {
            DisposeRequest storage request = disposeRequests[disposer][i];
            if (request.disposer == disposer && !request.verified) {
                emit MeetingScheduled(msg.sender, disposer);
                return;
            }
        }
        revert("No unverified sale requests found");
    }

    // Function for a collector to verify the item and mint the token
    function verifyAndMintToken(address disposer, uint256 amount) external {
        require(itemValues[disposeRequests[disposer][0].itemType] == amount, "Invalid amount");
        DisposeRequest storage request = disposeRequests[disposer][0];
        require(request.disposer == disposer && !request.verified, "Invalid sale request");

        // Mint tokens and transfer to the collector
        _mint(msg.sender, amount);

        // Mark the sale request as verified
        request.verified = true;

        emit ItemVerifiedAndMinted(msg.sender, request.itemType, amount);

        // Delete the disposer request once the transaction is complete
        delete disposeRequests[disposer][0];
    }
}
