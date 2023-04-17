// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// imports
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract alxToken is Ownable {
using SafeMath for uint256;


        // global Var
        string public tokenName = "ALX TOKEN";
        string public symbol = "ALX COIN";
        uint public decimals = 18; // 0.000000000000000009 // 9000000000000000000
        uint public decimalFactor = 10 ** decimals; // 10^18 10^2 0.00
        uint public totalSupply = 1000000 * decimalFactor; // 0.00000000001

        event Transfer(address indexed _from, address indexed _to, uint256 _amount);
        event Approval(address indexed _owner, address indexed _spender, uint256 _value);

        // mapping
        mapping(address => uint256) public balanceOf;
        mapping(address => mapping(address => uint256)) public allowance;

        constructor() {
            balanceOf[msg.sender] = totalSupply;
        }


        function transfer(address _to, uint256 _value) public returns (bool success) {
            require(balanceOf[msg.sender] >= _value);
            balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
            balanceOf[_to] = balanceOf[_to].add(_value);
            emit Transfer(msg.sender, _to, _value);
            return true;
        }


        function approve(address _spender, uint256 _value) public returns (bool success) {
            allowance[msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value);
            return true;
        }


        function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);
            balanceOf[_from] = balanceOf[_from].sub(_value);
            balanceOf[_to] = balanceOf[_to].add(_value);
            allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
            emit Transfer(_from, _to, _value);
            return true;
        }


        function mintToken(uint256 _amount) public onlyOwner returns (bool success) {
            totalSupply = totalSupply.add(_amount);
            balanceOf[msg.sender] = balanceOf[msg.sender].add(_amount);
            emit Transfer(address(0), msg.sender, _amount);
            return true;
        }
}
