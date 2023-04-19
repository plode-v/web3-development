// SPDX-License-Identifier: UNIDENTIFIED

pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }
    

}