let Token = artifacts.require("MyToken");

let chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);

chai.use(chaiBN);

let chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

contract("token test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;
    it("all tokens should be in my account", async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })

    it("is not possible to send more totals than in total", async () => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })
})