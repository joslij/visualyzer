import React from "react";
import { Header } from "semantic-ui-react";

import "./AppHeader.scss";

export const AppHeader = () => {
  return (
    <div className="vis-app-header">
      <Header as="h1" textAlign="center">
        <strong>Visual</strong>
        <sub>yzer</sub> - <i>Get insights from your visuals</i>
      </Header>
    </div>
  );
};
