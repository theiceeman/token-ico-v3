const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("LinkTokenCrowdsale", function () {
  before(async () => {
    [admin, investor1, investor2, investor3] = await ethers.getSigners();
    LinkToken = await ethers.getContractFactory("LinkToken");
    linkToken = await LinkToken.deploy(1000000);
    await linkToken.deployed();

    tokenPrice = "1000000000000000"; //  in wei = 0.001 ETH
    referrerPercentage = "10";
    totalTokensForAirdrop = "90";
    amtClaimedPerAirdrop = "50";
    LinkTokenCrowdsale = await ethers.getContractFactory("LinkTokenCrowdsale");
    linkCrowdSale = await LinkTokenCrowdsale.deploy(
      linkToken.address,
      tokenPrice,
      referrerPercentage,
      totalTokensForAirdrop,
      amtClaimedPerAirdrop
    );
    await linkCrowdSale.deployed();

    TokenTimeLock = await ethers.getContractFactory("TokenTimeLock");
    tokenTimeLock = await TokenTimeLock.deploy(
      linkToken.address,
      31536000,
      linkCrowdSale.address
    );
    await tokenTimeLock.deployed();

    await linkToken.transfer(linkCrowdSale.address, 750000); // Transfer 75% of total supply to crowdsale
    await linkCrowdSale.setTimeLock(tokenTimeLock.address);
  });

  describe("BuyTokenFunction", function () {
    it("should setup crowdsale contract with correct values", async function () {
      expect(await linkCrowdSale.token()).to.not.equal(0x0);
      expect(await linkCrowdSale.tokenPrice()).to.equal(tokenPrice);
    });

    it("should sell tokens to investors", async function () {
      let numberOfTokens = "100";
      let x = numberOfTokens * tokenPrice;
      // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      // 0x0000000000000000000000000000000000000000
      let zero_address = "0x0000000000000000000000000000000000000000";
      let txn = await linkCrowdSale
        .connect(investor1)
        .buyTokens(numberOfTokens, zero_address, {
          value: x.toString(),
        });
      let reciept = await txn.wait();
      // Triggers one event
      expect(reciept.events.length).to.equal(3);
      // Event triggered should be the Approval event
      expect(reciept.events[2].event).to.equal("Sell");
      // Event logs the correct required arguments
      expect(reciept.events[2].args._buyer).to.equal(investor1.address);
      expect(reciept.events[2].args._numberOfTokens).to.equal(100);
      // Should increment crowdsales no of tokens sold
      expect(await linkCrowdSale.tokensSold()).to.equal(100);
      // should increment buyers token balance
      expect(await linkToken.balanceOf(tokenTimeLock.address)).to.equal(100);

      await expect(
        linkCrowdSale
          .connect(investor1)
          .buyTokens(numberOfTokens, zero_address, {
            value: "10000",
          })
      ).to.be.revertedWith(
        "Crowdsale: msg.value must equal number of tokens in wei!"
      );

      await expect(
        linkCrowdSale.connect(investor1).buyTokens("900000", zero_address, {
          value: ("900000" * tokenPrice).toString(),
        })
      ).to.be.revertedWith(
        "Crowdsale: You can't buy more tokens than available!"
      );
    });
  });

  describe("rewardReferrerFunction", function () {
    it("should update tokensSold after rewarding referrer", async function () {
      let numberOfTokens = "100";
      let wei_equiv = numberOfTokens * tokenPrice;
      let referrer = investor1.address;
      let txn = await linkCrowdSale
        .connect(investor2)
        .buyTokens(numberOfTokens, referrer, {
          value: wei_equiv.toString(),
        });
      await txn.wait();
      expect(await linkCrowdSale.tokensSold()).to.equal(210);
    });

    it("should update referrers_total_locked_tokens after rewarding them", async function () {
      expect(
        await tokenTimeLock.TotalUserTokensLocked(investor1.address)
      ).to.equal(110);
    });
    it("should update totalTokensLocked after rewarding a referrer", async function () {
      expect(await tokenTimeLock.totalTokensLocked()).to.equal(210);
    });
    it("should register new referrals for a referrer", async function () {
      let userReferrals = await linkCrowdSale.UserReferrals(
        investor1.address,
        0
      );
      expect(userReferrals.referral_address).to.equal(investor2.address);
    });
  });

  
  describe("claimAirdrop", function () {

    it("should fail if caller has recieved airdrop previously", async function (){
      let txn = await linkCrowdSale.connect(investor1).claimAirdrop();
      txn.wait();
      await expect(
        linkCrowdSale.connect(investor1).claimAirdrop()
      ).to.be.revertedWith(
        "Airdrop: you've recieved airdrop previously!"
      );
    })
    
    it("should update total tokensSold after claiming airdrop", async function () {
      expect(await linkCrowdSale.tokensSold()).to.equal(260);
    });
    it("should update totalTokensLocked after claiming airdrop", async function () {
      expect(await tokenTimeLock.totalTokensLocked()).to.equal(260);
    });
    it("should whitelist users address after claiming airdrop", async function () {
      let whiteList = await linkCrowdSale.whiteListedAddressForAirdrop(
        investor1.address);
      expect(whiteList).to.equal(true);
    });
    it("should fail if totalTokensAirdropped will be greater than totalTokensForAirdrop", async function (){
      await expect(
        linkCrowdSale.connect(investor2).claimAirdrop()
      ).to.be.revertedWith(
        "Airdrop: airdrop has ended!"
      );
    })
    
  })

  describe("endSaleFunction", function () {
    it("should end token crowdsale", async function () {
      await expect(
        linkCrowdSale.connect(investor1).endSale()
      ).to.be.revertedWith("Crowdsale: only admin can end crowdsale!");
      await linkCrowdSale.connect(admin).endSale();
      // Ensure the remaining tokens after sale are transferred to the admin
      expect(await linkToken.balanceOf(admin.address)).to.equal(1000000 - 260);
      expect(await ethers.provider.getBalance(linkCrowdSale.address)).to.equal(
        0
      );
    });
  });
});
