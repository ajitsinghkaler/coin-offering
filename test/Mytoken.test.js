let Token = artifacts.require("MyToken");

let chai = require("./setupChai");
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({ path: "../.env" });


contract("token test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.MyToken = await Token.new(process.env.INITIAL_TOKEN)
    })
    it("all tokens should be in my account", async () => {
        let instance = this.MyToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.MyToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        return await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })

    it("is not possible to send more totals than in total", async () => {
        let instance = this.MyToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })
})