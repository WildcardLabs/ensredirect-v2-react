import Header from "./Header";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
} from "antd";
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
    <div
      style={{
        backgroundColor: "white",
        margin: 50,
        padding: 70,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Col span={11}>
          <Card
            bordered={false}
            style={{
              marginTop: 50,
              backgroundColor: "#f8f8f8",
              height: "123vh",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Profile preview
            </p>
            <iframe
              src="https://wildcards.wtf/page/"
              frameborder="0"
              hspace="0"
              vspace="0"
              marginheight="0"
              marginwidth="0"
              height="970px"
              width="100%"
            />
          </Card>
        </Col>
        <Col offset={2} span={11}>
          <Card
            bordered={false}
            style={{ marginTop: 50, backgroundColor: "#f8f8f8" }}
            hoverable={true}
          >
            <div>
              <Form name="form_item_path">
                <Form.Item name="YouTubeIcon">
                  <Divider orientation="left" plain>
                    <b>YouTube</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="YouTubeLink">
                  <Input
                    placeholder="Enter your YouTube link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="youtube"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="FacebookIcon">
                  <Divider orientation="left" plain>
                    <b>Facebook</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="FacebookLink">
                  <Input
                    placeholder="Enter your Facebook link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="facebook"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="TwitchIcon">
                  <Divider orientation="left" plain>
                    <b>Twitch</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="TwitchLink">
                  <Input
                    placeholder="Enter your Twitch link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="twitch"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="TikTokIcon">
                  <Divider orientation="left" plain>
                    <b>TikTok</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="TikTokLink">
                  <Input
                    placeholder="Enter your TikTok link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="tiktok"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="SpotifyIcon">
                  <Divider orientation="left" plain>
                    <b>Spotify Podcast</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="SpotifyLink">
                  <Input
                    placeholder="Enter your Spotify podcast link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="spotify"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="VimeoIcon">
                  <Divider orientation="left" plain>
                    <b>Vimeo</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="VimeoLink">
                  <Input
                    placeholder="Enter your Vimeo link"
                    size={"large"}
                    prefix={
                      <SocialIcon
                        network="vimeo"
                        style={{
                          height: 25,
                          width: 25,
                          marginRight: 10,
                        }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item name="AppleIcon">
                  <Divider orientation="left" plain>
                    <b>Apple Podcast</b>
                  </Divider>
                </Form.Item>
                <Form.Item name="AppleLink">
                  <Input
                    placeholder="Enter your Apple podcast link"
                    size={"large"}
                    prefix={
                      <FaPodcast
                        style={{
                          height: 25,
                          width: 25,
                        }}
                      />
                    }
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
