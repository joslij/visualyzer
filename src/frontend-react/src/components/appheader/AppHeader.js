import React from "react";
import { Container, Header } from "semantic-ui-react";

import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <Container className="vis-header-container">
      <Header as="h1" textAlign="center">
        <strong>Visual</strong>
        <sub>yzer</sub> - <i>Get insights from your visuals</i>
        <Header.Subheader>
          <i>
            <b>Scroll down</b> to see public visuals / <b>Login</b> to submit
            and get insights on your own visuals
          </i>
        </Header.Subheader>
      </Header>
    </Container>
  );
};

export default AppHeader;
