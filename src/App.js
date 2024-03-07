import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import "./polyfills";
import Home from "./components/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import Profile from "./components/Profile";
import ActiveStateContext from "./components/Context";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "ENS Redirect",
  projectId: "2aca272d18deb10ff748260da5f78bfd",
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const App = () => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(null);
  const [signer, setSigner] = useState({});
  const context = {
    isConnected,
    setIsConnected,
    address,
    setAddress,
    signer,
    setSigner,
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ActiveStateContext.Provider value={context}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </ActiveStateContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
