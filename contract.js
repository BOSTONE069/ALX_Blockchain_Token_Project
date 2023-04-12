const Web3 = require('web3');
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/M6m7lD2AmuRs4mJepYbATpe_0Vm_gQNG');

// The token contract ABI and address
const tokenABI = [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
const tokenAddress = '0x8D5FFFB23e9D70F2DE92c154735022F468e6Bd16';

// The address to check the balance of
const addressToCheck = '0x8D5FFFB23e9D70F2DE92c154735022F468e6Bd16';

// Create a new contract object using the ABI and address
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

// Call the balanceOf function to get the balance of the address
tokenContract.methods.balanceOf(addressToCheck).call()
  .then((balance) => {
    console.log(`The balance of ${addressToCheck} is ${balance}`);
  })
  .catch((error) => {
    console.error(error);
  });
