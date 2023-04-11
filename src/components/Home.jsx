import axios from "axios";
import { ethers } from "ethers";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./Header";
import { SocialIcon } from "react-social-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Result,
  Row,
  Select,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import ActiveStateContext from "./Context";

const Home = () => {
  const { address, signer } = useContext(ActiveStateContext);
  const [messageApi, contextHolder] = message.useMessage();
  const domainabi = [
    "function setContenthash(bytes32 node, bytes calldata hash)",
  ];
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
  const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

  const [isNextButtonActive, setIsNextButtonActive] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [domainSelectedFromList, setDomainSelectedFromList] = useState("");
  const navigate = useNavigate();
  const [loaderText, setLoaderText] = useState("");
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [redirectionModalOpen, setRedirectionModalOpen] = useState(false);
  const [redirectUrlInputFieldStatus, setRedirectUrlInputFieldStatus] =
    useState("");
  const [redirectUrlValue, setRedirectUrlValue] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [successResultModalOpen, setSuccessResultModalOpen] = useState(false);

  useEffect(() => {
    if (address) {
      fetchAddressDomains();
    }
  }, [address]);

  useEffect(() => {
    if (domainSelectedFromList) {
      setIsNextButtonActive(false);
    } else {
      setIsNextButtonActive(true);
    }
  }, [domainSelectedFromList]);

  const domainSelectionComponent = () => {
    const newDomainList = domainList.map((domain) => {
      let domainObject = {};
      domainObject["label"] = domain;
      domainObject["value"] = domain;
      return domainObject;
    });

    return (
      <>
        {address ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Space wrap>
              <Select
                allowClear
                showSearch
                placeholder="Select your ENS name"
                options={newDomainList}
                onChange={handleSelection}
                optionFilterProp="children"
                style={{
                  width: 200,
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />

              <Button
                disabled={isNextButtonActive}
                icon={<ArrowRightOutlined />}
                onClick={showOptionSelectionModal}
                size={"middle"}
                shape="round"
                type="primary"
              >
                Next
              </Button>
            </Space>
          </div>
        ) : (
          <ConnectButton
            showBalance={false}
            chainStatus={"none"}
            label={"Get Started"}
          />
        )}
      </>
    );
  };

  const fetchAddressDomains = () => {
    axios
      .get(
        `https://us-central1-matic-services.cloudfunctions.net/domainlist?address=${address}`
      )
      .then((response) => {
        setDomainList(response.data);
      });
  };

  const handleRedirectClick = () => {
    setOptionsModalOpen(false);
    setRedirectionModalOpen(true);
  };

  const handleRedirectOptionSubmission = () => {
    setButtonLoader(true);
    setLoaderText("Loading...");
    axios
      .get(
        `https://us-central1-matic-services.cloudfunctions.net/redirect?web=${redirectUrlValue}&ens=${domainSelectedFromList}&address=${address}`
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
            setLoaderText("Processing transaction....please wait!");
            transactionResponse
              .wait(1)
              .then((transactionReceipt) => {
                setRedirectionModalOpen(false);
                setRedirectUrlValue("");
                setButtonLoader(false);
                setLoaderText("");
                setTransactionHash(transactionReceipt.transactionHash);
                setSuccessResultModalOpen(true);
              })
              .catch((_) => {
                setRedirectionModalOpen(false);
                setRedirectUrlValue("");
                messageApi.open({
                  type: "error",
                  content: "Transaction failed.",
                });
                setButtonLoader(false);
                setLoaderText("");
              });
          })
          .catch((_) => {
            setRedirectionModalOpen(false);
            setRedirectUrlValue("");
            messageApi.open({
              type: "error",
              content: "Transaction cancelled by user.",
            });
            setButtonLoader(false);
            setLoaderText("");
          });
      });
  };

  const handleSelection = (valueSelected) => {
    valueSelected
      ? setDomainSelectedFromList(valueSelected)
      : setDomainSelectedFromList("");
  };

  const navigateToProfilePage = () => {
    navigate("/profile");
  };

  const showOptionSelectionModal = () => {
    setOptionsModalOpen(true);
  };

  function isUrl(string) {
    if (typeof string !== "string") {
      return false;
    }

    var match = string.match(protocolAndDomainRE);
    if (!match) {
      return false;
    }

    var everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
      return false;
    }

    if (
      localhostDomainRE.test(everythingAfterProtocol) ||
      nonLocalhostDomainRE.test(everythingAfterProtocol)
    ) {
      return true;
    }

    return false;
  }

  return (
    <>
      {contextHolder}
      <Header />
      <h1>Add utility to your ENS name</h1>
      <p className="subtitle">
        {" "}
        Maximize Your web3 presence with your ENS domain!
      </p>
      <p
        className="subtitle"
        style={{ margin: "30px", marginLeft: "200px", marginRight: "200px" }}
      >
        Add utility to your .eth domain with ENSRedirect! Curate and showcase
        your web3 profile by seamlessly integrating videos and podcasts from
        your favorite social platforms, or easily redirect your domain to any
        website of your choice – all for free.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          {domainSelectionComponent()}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              marginLeft: address ? 0 : 34,
              fontSize: 21,
              fontWeight: "bold",
            }}
          >
            Get in touch
          </p>
          <Space>
            <SocialIcon
              network="email"
              target="_blank"
              style={{
                height: 35,
                width: 35,
                marginLeft: address ? 0 : 30,
              }}
            />
            <p>team@ensredirect.xyz</p>
            <SocialIcon
              network="twitter"
              url="https://twitter.com/ensredirect"
              target="_blank"
              style={{
                height: 35,
                width: 35,
              }}
            />
            <p>@ensredirect</p>
            <SocialIcon
              network="github"
              url="https://github.com/ENS-Redirect/ensredirect-v2-react"
              target="_blank"
              style={{
                height: 35,
                width: 35,
              }}
            />
            <p>Github</p>
          </Space>
        </div>
      </div>
      <Modal
        centered
        footer={null}
        title={"Select option to proceed:"}
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
              disabled={isNextButtonActive}
              icon={<ArrowRightOutlined />}
              onClick={handleRedirectClick}
              size={"large"}
              type="primary"
              style={{
                margin: "20px",
                alignSelf: "center",
                width: "350px",
                textAlign: "left",
              }}
            >
              Redirect to any website
            </Button>
            <Button
              disabled={isNextButtonActive}
              icon={<ArrowRightOutlined />}
              onClick={navigateToProfilePage}
              size={"large"}
              type="primary"
              style={{
                marginBottom: "20px",
                alignSelf: "center",
                width: "350px",
                textAlign: "left",
              }}
            >
              Generate your web3 profile
            </Button>
          </div>
        </Space>
      </Modal>
      <Modal
        centered
        open={redirectionModalOpen}
        footer={null}
        onCancel={() => setRedirectionModalOpen(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>
            Redirect <b>{domainSelectedFromList}</b> to{" "}
          </p>
        </div>

        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "10px",
            marginBottom: "30px",
          }}
        >
          <Col span={16}>
            <Input
              style={{ height: "40px" }}
              placeholder="Enter website url to redirect to"
              status={redirectUrlInputFieldStatus}
              value={redirectUrlValue}
              onChange={(e) => {
                const url = e.target.value;
                setRedirectUrlValue(url);
                if (url !== "" && !isUrl(url)) {
                  setRedirectUrlInputFieldStatus("error");
                } else {
                  setRedirectUrlInputFieldStatus("");
                }
              }}
            />
          </Col>
          <Col offset={1} span={7}>
            <Button
              icon={<ArrowRightOutlined />}
              loading={buttonLoader}
              size={"small"}
              type="primary"
              onClick={handleRedirectOptionSubmission}
              style={{ height: "40px" }}
            >
              Redirect
            </Button>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>{loaderText} </p>
        </div>
      </Modal>
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
            title="Transaction completed successfully"
            extra={[
              <Button
                type="primary"
                href={`https://${domainSelectedFromList}.limo`}
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
      ;
    </>
  );
};

export default Home;
