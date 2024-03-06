import { Col, Image, Row } from "antd";
import logo from "../redirect2.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccountEffect } from "wagmi";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActiveStateContext from "./Context";

const Header = () => {
  useAccountEffect({
    onConnect({ address, connector, isReconnected }) {
      setAddress(address);
      setIsConnected(true);
    },
    onDisconnect() {
      setAddress("");
      setIsConnected(false);
    },
  });

  const navigate = useNavigate();

  const { setAddress, setIsConnected, setSigner } =
    useContext(ActiveStateContext);
  return (
    <>
      <Row justify="center" style={{ padding: "20px" }}>
        <Col span={8} type="flex" align="middle">
          <div onClick={() => navigate("/")}>
            <Image
              src={logo}
              style={{ height: 36, width: 36 }}
              preview={false}
            ></Image>
          </div>
        </Col>
        <Col span={5} offset={11} type="flex" align="middle">
          <ConnectButton
            showBalance={false}
            chainStatus={"none"}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default Header;
