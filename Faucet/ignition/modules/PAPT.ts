import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const PAPTModule = buildModule("PAPTModule", (m) => {

  const papt = m.contract("PAPT");

  return { papt };
});

export default PAPTModule;
