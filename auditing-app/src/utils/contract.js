import { ethers } from "ethers";
import { getWallet } from "./wallet";
import AuditAbi from "../../smart-contracts/artifacts/contracts/Audit.sol/Audit.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export async function getContract() {
  const wallet = await getWallet();
  const signer = wallet.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, AuditAbi.abi, signer);
}
