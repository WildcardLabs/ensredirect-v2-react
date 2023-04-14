import Header from "./Header";
import { ethers } from "ethers";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Result,
  Row,
  message,
  Modal,
  Spin,
} from "antd";
import { FaPodcast } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import ActiveStateContext from "./Context";
import axios from "axios";

const Profile = () => {
  const [buttonLoader, setButtonLoader] = useState(false);
  const domainabi = [
    "function setContenthash(bytes32 node, bytes calldata hash)",
  ];
  const { isConnected, setAddress, signer } = useContext(ActiveStateContext);
  const isMobile = window.innerWidth <= 400;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(
    `https://ensredirect.xyz/profile?ens=${location.state.ensName}`
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [successResultModalOpen, setSuccessResultModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    if (!isConnected) {
      setAddress("");
      navigate("/home");
    }
  }, [isConnected]);

  const handleFormSubmission = (values) => {
    submitProfile(values);
    setIframeUrl(
      `https://storage.googleapis.com/ensredirect/profile.html?ens=${location.state.ensName}&youtube=${values.youtube}&facebook=${values.facebook}&twitch=${values.twitch}&tiktok=${values.tiktok}&spotify=${values.spotify}&apple=${values.apple}`
    );
  };

  const submitProfile = (values) => {
    setButtonLoader(true);
    axios
      .get(
        `https://us-central1-matic-services.cloudfunctions.net/ensprofile?ens=${location.state.ensName}&youtube=${values.youtube}&facebook=${values.facebook}&twitch=${values.twitch}&tiktok=${values.tiktok}&spotify=${values.spotify}&apple=${values.apple}`
      )
      .then((response) => {
        const ensContract = new ethers.Contract(
          response.data.resolver,
          domainabi,
          signer
        );
        ensContract
          .setContenthash(response.data.node, response.data.ipfs)
          .then((transactionResponse) => {
            transactionResponse
              .wait(1)
              .then((transactionReceipt) => {
                setButtonLoader(false);
                setSuccessResultModalOpen(true);
                setTransactionHash(transactionReceipt.transactionHash);
              })
              .catch((_) => {
                messageApi.open({
                  type: "error",
                  content: "Transaction failed.",
                });
                setButtonLoader(false);
              });
          })
          .catch((_) => {
            messageApi.open({
              type: "error",
              content: "Transaction cancelled by user.",
            });
            setButtonLoader(false);
          });
      })
      .catch((_) => {
            messageApi.open({
              type: "error",
              content: "Transaction cancelled by user.",
            });
            setButtonLoader(false);
      });
  };

  return (
    <>
      {isMobile ? (
        <div
          style={{
            backgroundColor: "white",
            margin: 10,
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {contextHolder}
          <Header />
          <Row
            style={{
              display: "flex",
            }}
          >
            <Col>
              <Card
                bordered={false}
                style={{
                  marginTop: 20,
                  backgroundColor: "#f8f8f8",
                  width: "85vw",
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
                  src={iframeUrl}
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
            <Col>
              <Card
                bordered={false}
                style={{
                  backgroundColor: "#f8f8f8",
                  width: "85vw",
                  marginTop: "10px",
                }}
                hoverable={true}
              >
                <div>
                  <Form name="form_item_path" onFinish={handleFormSubmission}>
                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>YouTube</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="youtube">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Facebook</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="facebook">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Twitch</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="twitch">
                      <Input
                        placeholder="Enter your Twitch channel name"
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>TikTok</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="tiktok">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Spotify Podcast</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="spotify">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Apple Podcast</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="apple">
                      <Input
                        placeholder="Enter your Apple podcast link"
                        size={"large"}
                        prefix={
                          <FaPodcast
                            style={{
                              height: 25,
                              width: 25,
                              marginRight: 10,
                            }}
                          />
                        }
                      />
                    </Form.Item>
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
                          loading={buttonLoader}
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
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
          <Modal
            centered
            open={successResultModalOpen}
            footer={null}
            onCancel={() => setSuccessResultModalOpen(false)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Result
                status="success"
                title="Transaction Successful"
                subTitle='View your Web3 profile by appending ".limo" on any browser e.g. ensredirect.eth.limo'
                extra={[
                  <Button
                    type="primary"
                    href={`https://${location.state.ensName}.limo`}
                    target={"_blank"}
                  >
                    Test Redirect
                  </Button>,
                  <Button
                    type="primary"
                    target={"_blank"}
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    Etherscan
                  </Button>,
                ]}
              />
            </div>
          </Modal>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            margin: 50,
            padding: 70,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {contextHolder}
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
                  height: "104vh",
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
                  src={iframeUrl}
                  frameborder="0"
                  hspace="0"
                  vspace="0"
                  marginheight="0"
                  marginwidth="0"
                  style={{
                    minHeight: "600px",
                    maxHeight: "950px",
                    width: "100%",
                  }}
                />
              </Card>
            </Col>
            <Col offset={2} span={11}>
              <Card
                bordered={false}
                style={{
                  marginTop: 50,
                  backgroundColor: "#f8f8f8",
                }}
                hoverable={true}
              >
                <div>
                  <Form name="form_item_path" onFinish={handleFormSubmission}>
                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>YouTube</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="youtube">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Facebook</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="facebook">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Twitch</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="twitch">
                      <Input
                        placeholder="Enter your Twitch channel name"
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>TikTok</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="tiktok">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Spotify Podcast</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="spotify">
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

                    <Form.Item>
                      <Divider orientation="left" plain>
                        <b>Apple Podcast</b>
                      </Divider>
                    </Form.Item>
                    <Form.Item name="apple">
                      <Input
                        placeholder="Enter your Apple podcast link"
                        size={"large"}
                        prefix={
                          <FaPodcast
                            style={{
                              height: 25,
                              width: 25,
                              marginRight: 10,
                            }}
                          />
                        }
                      />
                    </Form.Item>
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
                          loading={buttonLoader}
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
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
          <Modal
            centered
            open={successResultModalOpen}
            footer={null}
            onCancel={() => setSuccessResultModalOpen(false)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Result
                status="success"
                title="Transaction Successful"
                subTitle='View your Web3 profile by appending ".limo" on any browser e.g. ensredirect.eth.limo'
                extra={[
                  <Button
                    type="primary"
                    href={`https://${location.state.ensName}.limo`}
                    target={"_blank"}
                  >
                    Test Redirect
                  </Button>,
                  <Button
                    type="primary"
                    target={"_blank"}
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    Etherscan
                  </Button>,
                ]}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Profile;
