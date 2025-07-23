export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (err) {
      console.error("Wallet connection error:", err);
      return null;
    }
  } else {
    alert("MetaMask not detected");
    return null;
  }
};
