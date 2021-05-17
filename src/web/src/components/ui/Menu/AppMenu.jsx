import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Icon, Menu, Visibility } from "semantic-ui-react";

import AuthContext from "../../contexts/AuthContext";

import { AppRoutes } from "../../routes";

import "./AppMenu.scss";

export const AppMenu = ({ user }) => {
  const [menuFixed, setMenuFixed] = useState(false);
  const authContext = useContext(AuthContext);

  const handleLogoutClick = () => {
    authContext.setData();
  };

  return (
    <Visibility
      className="vis-app-menu"
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
        size="massive"
        fixed={menuFixed ? "top" : undefined}
        className={menuFixed ? "vis-app-menu-fixed" : "vis-app-menu-regular"}
      >
        <Menu.Item header as={NavLink} to={AppRoutes.home.link()} exact>
          <div className="vis-app-logo-text">
            <b>Visual</b>
            <sub>
              <i>yzer</i>
            </sub>
          </div>
        </Menu.Item>
        {user && (
          <>
            <Menu.Item as={NavLink} to={AppRoutes.userVisuals.link()}>
              <Icon name="user" color="violet" />
              My Visuals
            </Menu.Item>
            <Menu.Item as={NavLink} to={AppRoutes.analyzeVisuals.link()}>
              <Icon name="image" color="violet" />
              Analyze
            </Menu.Item>
          </>
        )}
        {!user && (
          <Menu.Item position="right">
            <Button
              as={NavLink}
              to={AppRoutes.login.link()}
              color="violet"
              className="vis-app-button-auth"
            >
              Log in
            </Button>
            <Button
              as={NavLink}
              to={AppRoutes.register.link()}
              color="teal"
              className="vis-app-button-auth"
            >
              Register
            </Button>
          </Menu.Item>
        )}
        {user && (
          <Menu.Menu position="right">
            <Dropdown item text={`Hello, ${user.displayName}`}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to={AppRoutes.dashboard.link()}>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogoutClick}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
      </Menu>
    </Visibility>
  );
};
