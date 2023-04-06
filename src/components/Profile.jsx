import Header from "./Header";
import { Button, Form, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  //TODO check how to react to disconnection when in profile page and move user back to home page
  // useEffect(() => {
  //   console.log("State value of address is " + state.address);
  // }, [state]);

  return (
    <>
      <Header />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          marginTop: "200px",
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

          {loading ? (
            <Spin />
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default Profile;
