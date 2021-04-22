import React from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import VisualHighlight from "../visual-highlight/VisualHighLight";
import VisualSearch from "../visual-search";

const Visual = ({
  url,
  description,
  categories,
  tags,
  celebrities,
  landmarks,
}) => {
  return (
    <Segment raised>
      <Grid container>
        <Grid divided="vertically" padded>
          <Grid.Row columns={1}>
            <Grid.Column>
              <VisualSearch />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Image src={url} />
            </Grid.Column>
            <Grid.Column>
              {description ?? <i>No description available!</i>}
            </Grid.Column>
            <Grid.Column>
              todo:// social impact - to use twitter/instagram/facebook
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              {celebrities && celebrities.length > 0 ? (
                celebrities.map((celebrity) => {
                  console.log("LOGGING", celebrity);
                  <VisualHighlight {...celebrity} />;
                })
              ) : (
                <i>No celebrities found!</i>
              )}
            </Grid.Column>
            <Grid.Column>Here comes landmarks!</Grid.Column>
            <Grid.Column>
              Action buttons to get detailed analysis (like/something opposite -
              but need login)
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>
    </Segment>
  );
};

export default Visual;
