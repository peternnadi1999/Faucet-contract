import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const FaucetModule = buildModule("FaucetModule", (m) => {
    const tokenAddress ="0xEC1bf080BDFBbBa102603Cc1C55aFd215C694a2b";
  const faucet = m.contract("Faucet",[tokenAddress]);

  return { faucet };
});

export default FaucetModule;
