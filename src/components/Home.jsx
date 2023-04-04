import axios from "axios";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "./Header";
import { SocialIcon } from "react-social-icons";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { Button, Select, Space } from "antd";

const Home = () => {
  const { address } = useAccount();
  const [isNextButtonActive, setIsNextButtonActive] = useState(true);
  const [domainList, setDomainList] = useState([]);
  const [domainSelectedFromList, setDomainSelectedFromList] = useState("");

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
        {address ? ( //TODO return side by side with next button
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
                size={"large"}
                type="primary"
              >
                Next
              </Button>
            </Space>
          </div>
        ) : (
          <ConnectButton showBalance={false} chainStatus={"none"} />
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

  const handleSelection = (valueSelected) => {
    valueSelected
      ? setDomainSelectedFromList(valueSelected)
      : setDomainSelectedFromList("");
  };

  const showOptionSelectionModal = () => {
    //TODO show modal with two buttons to allow selection of option in order to move forward.
  };

  return (
    <>
      <Header />
      <h1>Add utility to your ENS name</h1>
      <p className="subtitle">
        {" "}
        Maximize Your web3 presence with your ENS domain!
      </p>
      <p className="subtitle">
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
        <div
          style={{
            margin: "40px",
          }}
        >
          {domainSelectionComponent()}
        </div>

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
