// SPDX-License-Identifier: UNIDENTIFIED

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address payable[] public players;
    address public lastWinner;

    constructor() {
        manager = msg.sender;
    }

    modifier managerOnly {
        require(msg.sender == manager);
        _;
    }

    function enter() public payable {
        require(msg.value >= 0.001 ether, "Sorry, must send 0.001 ETH or more.");
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function getAll() public view returns (address payable[] memory) {
        return players;
    }

    function pickWinner() public managerOnly {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        lastWinner = players[index];
        players = new address payable[](0);
    }
}