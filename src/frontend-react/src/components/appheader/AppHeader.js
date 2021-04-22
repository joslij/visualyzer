import React from "react";
import { Header, Container, Button } from "semantic-ui-react";

import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <Container className="vis-header-container">
      <Header as="h1" size="huge">
        <Header.Content>
          Visual
          <sub>
            <i>yzer</i>
          </sub>
        </Header.Content>
        <Header.Subheader>Get insights from images!</Header.Subheader>
      </Header>
      <Container textAlign="right">
        <Button color="green">Login</Button>
        <Button color="blue">Register</Button>
      </Container>
    </Container>
  );
};

export default AppHeader;
