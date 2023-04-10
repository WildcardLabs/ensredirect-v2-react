import { Col, Image, Row } from "antd";
import logo from "../redirect2.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useContext } from "react";
import ActiveStateContext from "./Context";

const Header = () => {
  useAccount({
    onConnect({ address, connector, isReconnected }) {
      setAddress(address);
      setIsConnected(true);
    },
    onDisconnect() {
      setAddress("");
      setIsConnected(false);
    },
  });

  const { setAddress, setIsConnected } = useContext(ActiveStateContext);
  return (
    <>
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col span={8} type="flex" align="middle">
          <Image src={logo} height={36} width={36} preview={false}></Image>
        </Col>
        <Col span={5} offset={11} type="flex" align="middle">
          <ConnectButton showBalance={false} chainStatus={"none"} />
        </Col>
      </Row>
    </>
  );
};
export default Header;
