const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const { latestTime } = require("./helpers/latest-time");
const { increaseTimeTo, duration } = require("./helpers/increase-time");
const { toDecimal } = require("./helpers/utils");

describe("TimeLockContract", function () {
  before(async () => {
    [admin, investor1, investor2, investor3] = await ethers.getSigners();
    LinkToken = await ethers.getContractFactory("LinkToken");
    linkToken = await LinkToken.deploy("1000000000000000000000000"); //  1000000
    await linkToken.deployed();

    tokenPrice = "1000000000000000"; //  in wei = 0.001 ETH
    referrerPercentage = "10";
    totalTokensForAirdrop = "90000000000000000000"; //  90
    amtClaimedPerAirdrop = "50000000000000000000"; //  50
    LinkTokenCrowdsale = await ethers.getContractFactory("LinkTokenCrowdsale");
    linkCrowdSale = await LinkTokenCrowdsale.deploy(
      linkToken.address,
      tokenPrice,
      referrerPercentage,
      totalTokensForAirdrop,
      amtClaimedPerAirdrop
    );
    await linkCrowdSale.deployed();

    releaseTime = 31536000;
    TokenTimeLock = await ethers.getContractFactory("TokenTimeLock");
    tokenTimeLock = await TokenTimeLock.deploy(
      linkToken.address,
      releaseTime,
      linkCrowdSale.address
    );
    await tokenTimeLock.deployed();

    await linkToken.transfer(linkCrowdSale.address, "750000000000000000000000"); // Transfer 75% of total supply to crowdsale
    await linkCrowdSale.setTimeLock(tokenTimeLock.address);

    ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  });
  describe("lockTokenFunction", function () {
    it("should setup timelock contract with correct configs", async function () {
      expect(await tokenTimeLock.admin()).to.equal(linkCrowdSale.address);
      expect(await tokenTimeLock.releaseTime()).to.equal(releaseTime);
      expect(await tokenTimeLock.totalTokensLocked()).to.equal(0x0);
    });

    it("should allow only crowdsale to lock tokens", async () => {
      await expect(
        tokenTimeLock
          .connect(investor1)
          .lockUserToken(
            BigNumber.from("100000000000000000000"),
            investor1.address,
            "purchase"
          )
      ).to.be.revertedWith(
        "TokenTimeLock: only admin is allowed to lock tokens!"
      ); //  100

      let numberOfTokens = "100";
      let x = numberOfTokens * tokenPrice;
      let txn = await linkCrowdSale
        .connect(investor1)
        .buyTokens(toDecimal(numberOfTokens, 18), ZERO_ADDRESS, {
          value: x.toString(),
        });
      let reciept = await txn.wait();
      // Triggers one event
      expect(reciept.events.length).to.equal(3);
      // Event triggered should be the Approval event
      expect(reciept.events[2].event).to.equal("Sell");
    });

    it("should only lock amount greater than zero", async () => {
      let numberOfTokens = "0";
      let x = numberOfTokens * tokenPrice;
      await expect(
        linkCrowdSale.connect(investor1).buyTokens(toDecimal(numberOfTokens, 18), ZERO_ADDRESS,{
          value: x.toString(),
        })
      ).to.be.revertedWith("TokenTimeLock: no tokens supplied to be locked!");
    });

    it("should store txn of token lock in vault", async () => {
      let tokenVault = await tokenTimeLock.UserTokenVault(investor1.address, 0);
      expect(tokenVault.amount_locked).to.equal(BigNumber.from("100000000000000000000")); //  100
    });

    it("should store history of a users token vesting in vault", async () => {
      let numberOfTokens = "200";
      let x = numberOfTokens * tokenPrice;
      let txn = await linkCrowdSale
        .connect(investor1)
        .buyTokens(toDecimal(numberOfTokens, 18), ZERO_ADDRESS,{
          value: x.toString(),
        });
      await txn.wait();

      let tokenVault = await tokenTimeLock.UserTokenVault(investor1.address, 1);
      expect(tokenVault.amount_locked).to.equal(BigNumber.from("200000000000000000000"));   //  200
      //   console.log("totalTokensLocked",await tokenTimeLock.totalTokensLocked());
    });

    it("should assert total_locked equals total_sold by crowdsale", async () => {
      let totalLocked = await tokenTimeLock.totalTokensLocked();
      let totalSold = await linkCrowdSale.tokensSold();
      expect(totalLocked).to.equal(totalSold);
    });

    /* it("should assert users total_token_locked is valid", async () => {
        let usersTotalLocked = await tokenTimeLock.TotalUserTokensLocked(investor1.address);
        expect(usersTotalLocked).to.equal(300);
    }) */

    it("should emit TokenIsLocked event after locking tokens", async () => {
      let numberOfTokens = "200";
      let x = numberOfTokens * tokenPrice;
      let _releaseTime = (await latestTime()) + releaseTime;
      let txn = await linkCrowdSale
        .connect(investor1)
        .buyTokens(toDecimal(numberOfTokens, 18), ZERO_ADDRESS,{
          value: x.toString(),
        });
      await txn.wait();
      expect(txn).to.emit(tokenTimeLock, "TokenIsLocked");
    });
    // this test wont update the state of the blockchain due to `callStatic`, so totalTokens wont be incremented by `100`
    it("should return true after locking tokens", async () => {
      let result = await tokenTimeLock
        .connect(linkCrowdSale.address)
        .callStatic.lockUserToken(BigNumber.from("100000000000000000000"), investor1.address, "purchase");  //  100
      await expect(result).to.equal(true);
    });
  });

  describe("claimFunction", async function () {
    it("should allow only valid vault_ids to be claimed", async () => {
      await expect(
        tokenTimeLock.connect(investor1).claim("3")
      ).to.be.revertedWith("TimeLock: vault does not exist!");
    });
    it("should not allow claiming before vesting period is over", async () => {
      await expect(
        tokenTimeLock.connect(investor1).claim("1")
      ).to.be.revertedWith("TimeLock: lock period is still active!");
    });
    it("should allow claim only when vesting period is over", async () => {
      await increaseTimeTo((await latestTime()) + (releaseTime + 1));
      await tokenTimeLock.connect(investor1).claim("1");
      expect(await linkToken.balanceOf(investor1.address)).to.equal(BigNumber.from("200000000000000000000")); //  200
    });
    it("should allow claim only if vault isReleased status equals false", async () => {
      await increaseTimeTo((await latestTime()) + (releaseTime + 1));
      await expect(
        tokenTimeLock.connect(investor1).claim("1")
      ).to.be.revertedWith("TimeLock: token has been claimed already!");
      let tokenVault = await tokenTimeLock.UserTokenVault(investor1.address, 1);
      expect(tokenVault.isReleased).to.equal(true);
    });
    it("should update totalTokensLocked after claim", async () => {
      let totalTokensLocked = await tokenTimeLock.totalTokensLocked();
      expect(totalTokensLocked).to.equal(BigNumber.from("300000000000000000000"));  //  300
    });
    it("should update TotalUserTokensLocked after claim", async () => {
      let TotalUserTokensLocked = await tokenTimeLock.TotalUserTokensLocked(
        investor1.address
      );
      expect(TotalUserTokensLocked).to.equal(BigNumber.from("300000000000000000000"));  //  300
    });
    it("should emit TokenIsClaimed event after claiming tokens", async () => {
      let tokenVault = await tokenTimeLock.UserTokenVault(investor1.address, 2);
      let txn = await tokenTimeLock.connect(investor1).claim("2");
      await txn.wait();
      expect(txn)
        .to.emit(tokenTimeLock, "TokenIsClaimed")
        .withArgs(investor1.address, tokenVault.amount_locked);
    });
    // this test wont update the state of the blockchain due to `callStatic`
    it("should return true after claiming tokens", async () => {
      let result = await tokenTimeLock
        .connect(investor1.address)
        .callStatic.claim("0");
      await expect(result).to.equal(true);
    });
  });
});
