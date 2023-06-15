const Web3 = require('web3');
const sh256 = require("crypto-js/sha256");
const bip39 = require('bip39');


//address: '0xE231995Dd00F2ceB6e1aCD98dC81e54b73B38C1D',
//privateKey: '0x5d9dfe8f7fbf72df78369b1eda5030c380e8d6a8cd3ac948844695f28cf2b873'

const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/M6m7lD2AmuRs4mJepYbATpe_0Vm_gQNG');

//get balance
web3.eth.getBalance("0xe4F509254fe8e5fa65E620De7525890421Ad003f", (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether")
  console.log("balance", balance)
})


//get accounts
web3.eth.getAccounts().then(accounts => {
  console.log("Accounts: ", accounts);
}).catch(err => {
  console.log("Error getting accounts: ", err);
});

const getWalletBalance = async (_address) => {

  // check if wallet address is valid
  if (!web3.utils.isAddress(_address)){
    throw new error("Invalid wallet address")
  }

  const balance = await web3.eth.getBalance(_address)
  return web3.utils.fromWei(balance, "ether")
}
getWalletBalance("0xe4F509254fe8e5fa65E620De7525890421Ad003f").then(console.log)
