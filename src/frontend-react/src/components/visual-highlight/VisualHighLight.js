import { Card } from "semantic-ui-react";

const VisualHighlight = (header, meta, description) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        {meta && <Card.Meta>{meta}</Card.Meta>}
        {description && <Card.Description>{description}</Card.Description>}
      </Card.Content>
    </Card>
  );
};

export default VisualHighlight;
