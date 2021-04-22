import React from "react";
import { Container, Divider } from "semantic-ui-react";

import "./App.scss";

import AppHeader from "../AppHeader";
import AppMenu from "../appmenu";
import Visual from "../visual";

import WireframeParagraphImage from "../../assets/wireframe/paragraph.png";

const App = () => {
  return (
    <Container>
      <div>
        <AppHeader />
        <AppMenu />
      </div>

      <Visual
        url={WireframeParagraphImage}
        description="A dummy image"
        celebrities={[(name = "fish")]}
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
      />
      <Visual
        url={
          "https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/06/Visual_identity_jpg_dBCAZ03V.jpg?auto=format&q=60&w=1280&h=1280&fit=crop&crop=faces"
        }
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
        celebrities={[(name = "fish")]}
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
      />
      <Visual
        url={
          "https://res.cloudinary.com/killer-infographics-inc/images/f_auto,q_auto/v1596545499/BlogHeader_VisualCommunication_V2-01/BlogHeader_VisualCommunication_V2-01.jpg"
        }
      />
    </Container>
  );
};

export default App;
