import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./Header";
import { SocialIcon } from "react-social-icons";

const Home = () => {
  return (
    <>
      <Header />
      <h1>Add utility to your ENS name</h1>
      <p class="subtitle"> Maximize Your web3 presence with your ENS domain!</p>
      <p class="subtitle">
        Connect with your audience everywhere by easily redirecting your domain
        with ENSRedirect.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ConnectButton />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <SocialIcon
            network="twitter"
            url="https://twitter.com/ensredirect"
            target="_blank"
            style={{
              margin: "10px",
              height: 35,
              width: 35,
            }}
          />
          <SocialIcon
            network="github"
            url="https://github.com/ENS-Redirect/ensredirect-v2-react"
            target="_blank"
            style={{
              margin: "10px",
              height: 35,
              width: 35,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
