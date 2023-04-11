import Header from "./Header";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, Space, Spin } from "antd";
import { FaPodcast } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import ActiveStateContext from "./Context";

const Profile = () => {
  const { isConnected, setAddress } = useContext(ActiveStateContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setAddress("");
      navigate(-1);
    }
  }, [isConnected]);

  return (
    <>
      <Header />
      <div
        style={{
          width: "100vw",
          marginTop: "80px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Form name="form_item_path">
          <Form.Item name="YouTubeIcon">
            <SocialIcon
              network="youtube"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="YouTubeLink">
            <Input
              placeholder="Enter your YouTube link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="FacebookIcon">
            <SocialIcon
              network="facebook"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="FacebookLink">
            <Input
              placeholder="Enter your Facebook link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="TwitchIcon">
            <SocialIcon
              network="twitch"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="TwitchLink">
            <Input
              placeholder="Enter your Twitch link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="TikTokIcon">
            <SocialIcon
              network="tiktok"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="TikTokLink">
            <Input
              placeholder="Enter your TikTok link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="SpotifyIcon">
            <SocialIcon
              network="spotify"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="SpotifyLink">
            <Input
              placeholder="Enter your Spotify link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="VimeoIcon">
            <SocialIcon
              network="vimeo"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="VimeoLink">
            <Input
              placeholder="Enter your Vimeo link"
              style={{ width: "60vw" }}
            />
          </Form.Item>

          <Form.Item name="AppleIcon">
            <FaPodcast
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Form.Item>
          <Form.Item name="AppleLink">
            <Input
              placeholder="Enter your Apple podcast link"
              style={{ width: "60vw" }}
            />
          </Form.Item>
        </Form>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "10px",
            marginBottom: "30px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size={"large"}
            onClick={() => setOptionsModalOpen(true)}
            style={{
              display: "flex",
            }}
          >
            Confirm profile
          </Button>
        </Row>
      )}
      <Modal
        centered
        title={"Select option to proceed:"}
        footer={null}
        open={optionsModalOpen}
        onOk={() => setOptionsModalOpen(false)}
        onCancel={() => setOptionsModalOpen(false)}
      >
        <Space direction="vertical">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              icon={<ArrowRightOutlined />}
              size={"large"}
              type="primary"
              style={{
                margin: "20px",
                alignSelf: "center",
                width: "350px",
                textAlign: "left",
              }}
            >
              Preview Profile
            </Button>
            <Button
              icon={<ArrowRightOutlined />}
              size={"large"}
              type="primary"
              style={{
                marginBottom: "20px",
                alignSelf: "center",
                width: "350px",
                textAlign: "left",
              }}
            >
              Continue
            </Button>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default Profile;
