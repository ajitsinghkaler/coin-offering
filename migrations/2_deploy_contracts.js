var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var MyKyc = artifacts.require("./KycContract.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
  const addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, process.env.INITIAL_TOKEN);
  await deployer.deploy(MyKyc);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKyc.address);
  const instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKEN)
};
