import React from "react";
import { Grid, Image } from "semantic-ui-react";

import WireframeParagraphImage from "../../assets/wireframe/paragraph.png";

const Visual = () => {
  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <Image src={WireframeParagraphImage} />
        </Grid.Column>
        <Grid.Column>todo:// Description, Categories and tags</Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column>Here comes Celebrities!</Grid.Column>
        <Grid.Column>Here comes landmarks!</Grid.Column>
        <Grid.Column>
          <Image src={WireframeParagraphImage} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Visual;
