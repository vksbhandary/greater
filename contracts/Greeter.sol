// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

contract Greeter {
    string private greeting = "";
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    function setGreeting(string calldata _greeting) external onlyOwner {
        greeting = _greeting;
    }

    function greet() external view returns (string memory) {
        return greeting;
    }

    function owner() external view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not owner");
        _;
    }
}
