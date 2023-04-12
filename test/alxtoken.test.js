// SPDX-License-Identifier: MIT
const alxToken = artifacts.require("alxToken");
const { expect } = require("chai");
const { BN, constants, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

contract("alxToken", accounts => {
  let tokenInstance;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const mintAmount = new BN(1000000);
  const transferAmount = new BN(1000);

  before(async () => {
    tokenInstance = await alxToken.deployed();
  });

  describe("Deployment", () => {
    it("Should set the correct token name, symbol, decimals, and total supply", async () => {
      expect(await tokenInstance.tokenName()).to.equal("web3ClubsToken");
      expect(await tokenInstance.symbol()).to.equal("WCT");
      expect(await tokenInstance.decimals()).to.be.bignumber.equal(new BN(18));
      expect(await tokenInstance.totalSupply()).to.be.bignumber.equal(mintAmount);
    });

    it("Should assign the total supply to the contract creator", async () => {
      const balance = await tokenInstance.balanceOf(owner);
      expect(balance).to.be.bignumber.equal(mintAmount);
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens from sender to receiver", async () => {
      const senderBalanceBefore = await tokenInstance.balanceOf(owner);
      const receiverBalanceBefore = await tokenInstance.balanceOf(user1);

      await tokenInstance.transfer(user1, transferAmount, { from: owner });

      const senderBalanceAfter = await tokenInstance.balanceOf(owner);
      const receiverBalanceAfter = await tokenInstance.balanceOf(user1);

      expect(senderBalanceAfter).to.be.bignumber.equal(senderBalanceBefore.sub(transferAmount));
      expect(receiverBalanceAfter).to.be.bignumber.equal(receiverBalanceBefore.add(transferAmount));

      await expectEvent(tokenInstance, "Transfer", {
        _from: owner,
        _to: user1,
        _value: transferAmount
      });
    });

    it("Should fail to transfer tokens if sender does not have enough balance", async () => {
      const senderBalanceBefore = await tokenInstance.balanceOf(user1);

      await expectRevert(
        tokenInstance.transfer(user2, transferAmount, { from: user1 }),
        "SafeMath: subtraction overflow"
      );

      const senderBalanceAfter = await tokenInstance.balanceOf(user1);
      expect(senderBalanceAfter).to.be.bignumber.equal(senderBalanceBefore);
    });
  });

  describe("Approve and transferFrom", () => {
    beforeEach(async () => {
      await tokenInstance.approve(user1, transferAmount, { from: owner });
    });

    it("Should approve an allowance to the spender", async () => {
      const allowance = await tokenInstance.allowance(owner, user1);
      expect(allowance).to.be.bignumber.equal(transferAmount);

      await expectEvent(tokenInstance, "Approval", {
        _owner: owner,
        _spender: user1,
        _value: transferAmount
      });
    });

    }
}
