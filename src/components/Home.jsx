import { Button, Col, Image, Row } from "antd";
import logo from "../redirect2.png";
import { SocialIcon } from "react-social-icons";

const Home = () => {
  return (
    <>
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col span={8} type="flex" align="middle">
          <Image src={logo} height={36} width={36} preview={false}></Image>
        </Col>
        <Col span={8} offset={8} type="flex" align="middle">
          <Button type="primary" size={"large"}>
            Connect Wallet
          </Button>
        </Col>
      </Row>
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
        <Button
          type="primary"
          size={"large"}
          style={{ width: "30vh", marginTop: "40px" }}
        >
          Connect Wallet
        </Button>
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
