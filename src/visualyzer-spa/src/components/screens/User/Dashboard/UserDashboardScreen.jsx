import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";

import AuthContext from "../../../contexts/AuthContext";

import { AppRoutes } from "../../../routes";

export const UserDashboardScreen = ({ visuals }) => {
  const { user } = useContext(AuthContext);

  const profileCard = () => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Profile</Card.Header>
          <Card.Description>
            {user.firstName} {user.lastName}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Icon name="user" />
          Display name: {user.displayName}
        </Card.Content>
        <Card.Content>
          <Icon name="mail" />
          Email: {user.email}
        </Card.Content>
      </Card>
    );
  };

  const visualsCard = () => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Visuals</Card.Header>
          <Card.Description>
            You have {visuals?.length ?? 0} visuals
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <div className="ui two buttons">
            <Button
              basic
              color="violet"
              as={Link}
              to={AppRoutes.analyzeVisuals.path}
            >
              Analyze visual
            </Button>
            <Button
              basic
              color="violet"
              as={Link}
              to={AppRoutes.userVisuals.path}
            >
              View visuals
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  };

  const render = () => {
    return (
      <Card.Group style={{ paddingTop: "20px" }}>
        {user && profileCard()}
        {user && visualsCard()}
        {!user && (
          <Card.Content>
            <Card.Header>Please login to get access</Card.Header>
          </Card.Content>
        )}
      </Card.Group>
    );
  };

  return render();
};
