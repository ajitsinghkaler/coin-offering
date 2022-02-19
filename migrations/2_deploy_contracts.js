var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");

module.exports = async function(deployer) {
  const addr = await web3.eth.getAccounts();
  const numberOfTokens = 1000000
  deployer.deploy(MyToken, numberOfTokens);
  // deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);
  // const instance = await MyToken.deployed();
  // await instance.transfer(MyTokenSale.addres, numberOfTokens)
};
