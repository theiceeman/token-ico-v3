const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("LinkToken", function () {
  before(async () => {
    [admin, investor1, investor2, investor3] = await ethers.getSigners();
    LinkToken = await ethers.getContractFactory("LinkToken");
    linkToken = await LinkToken.deploy("1000000000000000000000000"); //  1000000
    await linkToken.deployed();
  });
  it("should setup token contract with correct values", async function () {
    expect(await linkToken.name()).to.equal("Link Token");
    expect(await linkToken.symbol()).to.equal("LINK");
  });
  it("should mint token supply to admin on deployment", async function () {
    expect(await linkToken.totalSupply()).to.equal(
      BigNumber.from("1000000000000000000000000")
    ); //  1000000
    expect(await linkToken.balanceOf(admin.address)).to.equal(
      BigNumber.from("1000000000000000000000000")
    ); //  1000000
  });

  it("should allow transfer of tokens", async function () {
    await expect(
      linkToken.transfer(
        investor1.address,
        BigNumber.from("999999999000000000000000000")
      )
    ).to.be.revertedWith("Insufficient funds"); //  999999999
    let transfer = await linkToken.callStatic.transfer(
      investor1.address,
      BigNumber.from("100000000000000000000")
    ); //  100
    expect(transfer).to.equal(true);
    let txn = await linkToken.transfer(
      investor1.address,
      BigNumber.from("100000000000000000000")
    ); //  100
    let reciept = await txn.wait();

    // Triggers one event
    expect(reciept.events.length).to.equal(1);
    // Event triggered should be the transfer event
    expect(reciept.events[0].event).to.equal("Transfer");
    // Event logs the correct required arguments
    expect(reciept.events[0].args._from).to.equal(admin.address);
    expect(reciept.events[0].args._to).to.equal(investor1.address);
    expect(reciept.events[0].args._value).to.equal(
      BigNumber.from("100000000000000000000")
    ); //  100

    // Deducts & adds funds from intended accounts
    expect(await linkToken.balanceOf(investor1.address)).to.equal(
      BigNumber.from("100000000000000000000")
    ); //  100
    expect(await linkToken.balanceOf(admin.address)).to.equal(
      BigNumber.from("999900000000000000000000")
    ); //  999900
  });

  it("should approve third-party transfer of token", async function () {
    // Call function and get just the return value
    let transfer = await linkToken.callStatic.approve(investor1.address, 100);
    expect(transfer).to.equal(true);

    // Call function and get your txn reciept before its even mined
    let txn = await linkToken.approve(investor1.address, 100);

    // Get reciept after waiting for your txn to be mined
    let reciept = await txn.wait();

    // Triggers one event
    expect(reciept.events.length).to.equal(1);
    // Event triggered should be the Approval event
    expect(reciept.events[0].event).to.equal("Approval");
    // Event logs the correct required arguments
    expect(reciept.events[0].args._owner).to.equal(admin.address);
    expect(reciept.events[0].args._spender).to.equal(investor1.address);
    expect(reciept.events[0].args._value).to.equal(100);

    // Deducts & adds funds from intended accounts
    expect(
      await linkToken.allowance(admin.address, investor1.address)
    ).to.equal(100);
  });

  it("should perform third-party transfer of token", async function () {
    _from = investor1.address;
    _to = investor2.address;
    _spender = investor3.address;

    await linkToken
      .connect(investor1)
      .approve(_spender, BigNumber.from("10000000000000000000")); //  10

    // Try transferring more than `_from` balance
    await expect(
      linkToken
        .connect(investor3)
        .transferFrom(_from, _to, BigNumber.from("9999000000000000000000"))
    ).to.be.revertedWith("Insufficient balance"); //  9999
    await expect(
      linkToken
        .connect(investor3)
        .transferFrom(_from, _to, BigNumber.from("20000000000000000000"))
    ).to.be.revertedWith("Insufficient allowed funds"); //  20
    // Returns true when successfull
    let transfer = await linkToken
      .connect(investor3)
      .callStatic.transferFrom(
        _from,
        _to,
        BigNumber.from("10000000000000000000")
      ); //  10
    await expect(transfer).to.equal(true);

    let txn = await linkToken
      .connect(investor3)
      .transferFrom(_from, _to, BigNumber.from("10000000000000000000")); //  10

    let reciept = await txn.wait();
    expect(reciept.events.length).to.equal(1);
    // Event triggered should be the transfer event
    expect(reciept.events[0].event).to.equal("Transfer");

    expect(await linkToken.balanceOf(_from)).to.equal(
      BigNumber.from("90000000000000000000")
    ); //  90
    expect(await linkToken.balanceOf(_to)).to.equal(
      BigNumber.from("10000000000000000000")
    ); //  10
    expect(await linkToken.allowance(_from, _spender)).to.equal(0);
  });
});
