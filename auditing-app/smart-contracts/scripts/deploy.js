const hre = require("hardhat");

async function main() {
  const AuditFactory = await hre.ethers.getContractFactory("Audit");
  const audit = await AuditFactory.deploy();

  console.log("Deploying contract...");
  await audit.waitForDeployment();

  console.log(`Audit contract deployed at: ${await audit.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
