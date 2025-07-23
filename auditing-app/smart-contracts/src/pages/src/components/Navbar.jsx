import { useState } from "react";
import { connectWallet } from "../utils/wallet";

export default function Navbar() {
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      const wallet = await connectWallet();
      setAccount(wallet);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Audit dApp</h1>
      <div>
        {account ? (
          <span className="bg-green-600 px-3 py-1 rounded">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
