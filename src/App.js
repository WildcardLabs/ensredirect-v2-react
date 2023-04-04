import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ENS Redirect",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
