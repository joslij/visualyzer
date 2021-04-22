import React, { useState } from "react";
import {
  Button,
  Container,
  Image,
  Label,
  Menu,
  Visibility,
} from "semantic-ui-react";

import appLogoImage from "../../assets/visualyzer-image-default.png";

import "./AppMenu.scss";

const AppMenu = () => {
  const [menuFixed, setMenuFixed] = useState(false);

  return (
    <Visibility
      onBottomPassed={() => {
        setMenuFixed(true);
        return false;
      }}
      onBottomVisible={() => {
        setMenuFixed(false);
        return false;
      }}
      once={false}
    >
      <Menu
        size="large"
        fixed={menuFixed ? "top" : undefined}
        borderless
        className={menuFixed ? "vis-menu-fixed" : "vis-menu-regular"}
      >
        <Container>
          <Menu.Item header>
            <Image size="small" rounded src={appLogoImage} alt="Visualyzer" />
          </Menu.Item>
          <Menu.Item active>Home</Menu.Item>
          <Menu.Item>About ??</Menu.Item>
          <Menu.Item position="right">
            <Button color="violet" className="vis-auth-button">
              Log in
            </Button>
            <Button color="teal" className="vis-auth-button">
              Sign up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </Visibility>
  );
};

export default AppMenu;
