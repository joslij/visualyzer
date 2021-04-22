import { Card } from "semantic-ui-react";

const VisualHighlight = (name, meta, description) => {
  return (
    <Card>
      <Card.Content>
        {name && <Card.Header>{name}</Card.Header>}
        {meta && <Card.Meta>{meta}</Card.Meta>}
        {description && <Card.Description>{description}</Card.Description>}
      </Card.Content>
    </Card>
  );
};

export default VisualHighlight;
