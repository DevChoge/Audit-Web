import { ethers } from "ethers";
import Audit from "./Audit.json";

// Replace this with your deployed contract address
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getEthereumContract = () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Audit.abi, signer);

  return contract;
};
