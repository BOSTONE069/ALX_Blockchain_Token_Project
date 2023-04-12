const alxToken = artifacts.require("alxToken");

module.exports = function(deployer) {
  deployer.deploy(alxToken);
};
