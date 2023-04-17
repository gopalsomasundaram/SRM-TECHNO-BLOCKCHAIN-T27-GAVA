// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract OrderStorage {
    // Define a struct to hold the order details
    struct Order {
        uint orderNumber;
        string customerName;
        uint totalPrice;
        string imageHash;
    }

    // Define a mapping to store orders by their order number
    mapping (uint => Order) orders;

    // Define a function to add a new order
    function addOrder(uint orderNumber, string memory customerName, uint totalPrice, string memory imageHash) public {
        // Create a new Order struct
        Order memory newOrder = Order({
            orderNumber: orderNumber,
            customerName: customerName,
            totalPrice: totalPrice,
            imageHash: imageHash
        });

        // Store the new order in the mapping
        orders[orderNumber] = newOrder;
    }

    // Define a function to get an order by its order number
    function getOrder(uint orderNumber) public view returns (uint, string memory, uint, string memory) {
        // Get the order from the mapping
        Order memory order = orders[orderNumber];

        // Return the order details
        return (order.orderNumber, order.customerName, order.totalPrice, order.imageHash);
    }
}