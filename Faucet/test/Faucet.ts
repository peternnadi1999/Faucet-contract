import {
  time,
  loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Faucet", function () {

  async function deployTokenFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("PAPT");
    const token = await Token.deploy();

    return { token, owner, otherAccount };
  }


  
  async function deployFaucetFixture() {

    const {token} = await loadFixture(deployTokenFixture);

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy(token.getAddress());

    return { faucet, token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right tokenAddress", async function () {
      const { faucet, token } = await loadFixture(deployFaucetFixture);

      expect(await faucet.token()).to.equal(token);
    });
  });

  describe("RequestToken", ()=>{
    it("Should check for address zero", async ()=>{
      const { faucet, token, otherAccount } = await loadFixture(deployFaucetFixture);
      await token.transfer(faucet, ethers.parseEther("2000"));
      expect(await faucet.connect(otherAccount).requestToken()).not.to.be.revertedWithCustomError(faucet, "ZeroAddressCannotCallThisFunction");

    })

    it("Should check if balance is greater than withdraw amount", async ()=>{
      const { faucet, token, otherAccount } = await loadFixture(deployFaucetFixture);
      await token.transfer(faucet, ethers.parseEther("2000"));

      expect(await token.balanceOf(faucet.getAddress())).to.be.gte(ethers.parseEther("10"));
      expect(await faucet.connect(otherAccount).requestToken()).not.to.be.revertedWithCustomError(faucet, "InsufficientFaucetBalance");

    })

    it("Should check if Time to claim again has reached", async ()=>{
      const { faucet, token, otherAccount } = await loadFixture(deployFaucetFixture);
      await token.transfer(faucet, ethers.parseEther("2000"));


      // expect(time.latest).to.be.gte();
      expect(await faucet.connect(otherAccount).requestToken()).not.to.be.revertedWithCustomError(faucet, "InsufficientFaucetBalance");

    })
  })

 
  });
