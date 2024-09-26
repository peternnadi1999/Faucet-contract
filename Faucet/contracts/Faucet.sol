// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Faucet{
    address payable owner;
    IERC20 public token;
    uint public withdrawAmount = 10e18;
    uint public lockTime = 1 minutes;

    mapping (address => uint) public nextRequestTime;


    error ZeroAddressCannotCallThisFunction();
    error InsufficientFaucetBalance();
    error WaitForTheNextClaimTime();
    error OnlyownerCanCallThisFunction(); 

    event Deposited(address indexed from, uint256 indexed amount);
    event SuccessfullyWithdrawal(address indexed to, uint indexed amount);

    constructor(address tokenAddress) payable{
        owner= payable(msg.sender);
        token =  IERC20(tokenAddress);
    }

    modifier Onlyowner() {
        if(msg.sender!= owner){
            revert OnlyownerCanCallThisFunction();
        }
        _;
    }


    function requestToken() external{
        if(msg.sender == address(0)){
            revert ZeroAddressCannotCallThisFunction();
        }
        if(token.balanceOf(address(this)) <= withdrawAmount){
            revert InsufficientFaucetBalance();
        }
        if(block.timestamp <= nextRequestTime[msg.sender]){
            revert WaitForTheNextClaimTime();
        }

        nextRequestTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, withdrawAmount);
    }


    function getBalance() external view returns(uint256){
       return token.balanceOf(address(this));
    }

    receive() external payable{
        emit Deposited(msg.sender, msg.value);
    }

    function setWithdrawAmount(uint256 _amount) external Onlyowner{
        withdrawAmount = _amount * 1e18;
    }
    

    function setLockTime(uint256 _newTime) external Onlyowner{
        lockTime = _newTime * 1 minutes;
    }


    function withdraw() external Onlyowner {
        emit SuccessfullyWithdrawal(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}
