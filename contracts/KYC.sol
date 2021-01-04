pragma solidity ^0.7.6;
import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
    mapping(address => bool) allowed;

    function allowKYC(address _address) public onlyOwner {
        allowed[_address] = true;
    }

    function revokeKYC(address _address) public onlyOwner {
        allowed[_address] = false;
    }

    function validateKYC(address _address) public view returns(bool) {
        return allowed[_address];
    }
}