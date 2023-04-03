import { Col, Image, Row } from "antd";
import logo from "../redirect2.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <>
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col span={8} type="flex" align="middle">
          <Image src={logo} height={36} width={36} preview={false}></Image>
        </Col>
        <Col span={5} offset={11} type="flex" align="middle">
          <ConnectButton />
        </Col>
      </Row>
    </>
  );
};
export default Header;
