// src/utils/wallet.js
export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0]; // Return the first connected address
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

export const checkIfWalletIsConnected = async () => {
  if (!window.ethereum) {
    console.log("MetaMask not installed.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      return accounts[0];
    }

    return null;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return null;
  }
};