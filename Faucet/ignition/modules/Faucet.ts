import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const FaucetModule = buildModule("FaucetModule", (m) => {
    const tokenAddress ="";
  const faucet = m.contract("Faucet",[tokenAddress]);

  return { faucet };
});

export default FaucetModule;
