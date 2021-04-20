import React from "react";
import { Container, Divider } from "semantic-ui-react";

import "./App.scss";
import AppHeader from "../AppHeader";
import Visual from "../visual";

const App = () => {
  return (
    <Container>
      <AppHeader />
      <Divider />
      <Visual />
      <Visual />
      <Visual />
    </Container>
  );
};

export default App;
