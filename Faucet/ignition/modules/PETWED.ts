import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const PETWEDModule = buildModule("PETWEDModule", (m) => {

  const petweb = m.contract("PETWED");

  return { petweb };
});

export default PETWEDModule;
