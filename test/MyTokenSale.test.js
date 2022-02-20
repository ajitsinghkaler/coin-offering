const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const Kyc = artifacts.require("KycContract");

const chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async function (accounts) {
    const [initialHolder, recipient, anotherAccount] = accounts;

    it("there shouldnt be any coins in my account", async () => {
        const instance = await Token.deployed();
        return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
    it("all coins should be in the tokensale smart contract", async () => {
        const instance = await Token.deployed();
        const balance = await instance.balanceOf.call(TokenSale.address);
        const totalSupply = await instance.totalSupply.call();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        const tokenInstance = await Token.deployed();
        const tokenSaleInstance = await TokenSale.deployed();
        const kyc = await Kyc.deployed();
        const balanceBeforeAccount = await tokenInstance.balanceOf(initialHolder);
        await kyc.setKycCompleted(initialHolder, { from: initialHolder })
        await expect(tokenSaleInstance.sendTransaction({ from: initialHolder, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(initialHolder));

    });

});