// SPDX-License-Identifier: UNIDENTIFIED

pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    modifier managerOnly {
        require(msg.sender == manager);
        _;
    }

    function enter() public payable {
        require(msg.value >= 0.1 ether, "Sorry, must send 0.1 ETH or more.");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function getAll() public view returns (address[]) {
        return players;
    }

    function pickWinner() public managerOnly {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);

        players = new address[](0);
    }
}