import React from "react";
import { Link } from "react-router-dom";
import { Card, Label, Image } from "semantic-ui-react";
import "./VisualItemScreen.scss";

import { AppRoutes } from "../../../routes";

export const VisualItemScreen = ({ type, item, handleVisualItemClick }) => {
  const {
    id,
    url,
    description: { text },
    categories,
    people,
    landmarks,
    user: { name: userName },
  } = item;
  const renderListItems = (list, label) => {
    let listItems = null;
    if (list && list.length > 0) {
      listItems = list.map((item) => {
        return (
          <Label key={item.replaceAll(" ", "")} className="vis-item-label">
            {item}
          </Label>
        );
      });
    } else {
      listItems = <i>None found!</i>;
    }
    return (
      <>
        <h4>{label}</h4>
        {listItems}
      </>
    );
  };

  return (
    <Card
      as={Link}
      to={
        type === "public"
          ? AppRoutes.visualDetails.link(id)
          : AppRoutes.visualEdit.link(id)
      }
      onClick={() => handleVisualItemClick(id)}
    >
      <Image src={url} width="290px" height="200px"></Image>
      <Card.Content>
        <Card.Header>{text ?? <i>No description available!</i>}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        {categories && renderListItems(categories, "Categories")}
      </Card.Content>
      <Card.Content extra>
        {people && renderListItems(people, "People")}
      </Card.Content>
      <Card.Content extra>
        {landmarks && renderListItems(landmarks, "Landmarks")}
      </Card.Content>
    </Card>
  );
};
