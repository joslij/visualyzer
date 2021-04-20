import React from "react";
import { Header, Container } from "semantic-ui-react";

import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <Container className="vis-header-container">
      <Header as="h1" size="huge">
        Visual
        <sub>
          <i>yzer</i>
        </sub>
      </Header>
    </Container>
  );
};

export default AppHeader;
