import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Comment,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
  Statistic,
} from "semantic-ui-react";

import {
  getPublicVisualDetails,
  getUserVisualDetails,
  likeVisual,
  dislikeVisual,
  toggleVisualShare,
  addComment,
  deleteVisual,
} from "../../../../services";

import "./VisualItemDetailsScreen.scss";
import dummyUserAvatar from "../../../../assets/wireframe/dummy-user.png";

import AuthContext from "../../../contexts/AuthContext";

export const VisualItemDetailsScreen = ({ type, id }) => {
  if (!id) {
    ({ id } = useParams());
  }

  const authContext = useContext(AuthContext);

  const [visual, setVisual] = useState({
    type: type,
    id: id ?? null,
    loading: true,
    data: null,
    message: null,
    deleted: false,
  });

  const [commentFormData, setCommentFormData] = useState({
    text: "",
  });

  useEffect(async () => {
    if (visual.id) {
      const apiResponse =
        type === "public"
          ? await getPublicVisualDetails(id)
          : await getUserVisualDetails(authContext.token, id);
      setVisual({
        ...visual,
        loading: false,
        id: id,
        data: apiResponse?.data,
        message: apiResponse?.message ?? null,
      });
    }
  }, []);

  const handleLikeButtonClick = async () => {
    setVisual({
      ...visual,
      loading: true,
    });
    const apiResponse = await likeVisual(authContext.token, id);
    setVisual({
      ...visual,
      loading: false,
      data: apiResponse?.data ?? null,
      message: apiResponse?.message ?? null,
    });
  };

  const handleDislikeButtonClick = async () => {
    setVisual({
      ...visual,
      loading: true,
    });
    const apiResponse = await dislikeVisual(authContext.token, id);
    setVisual({
      ...visual,
      loading: false,
      data: apiResponse?.data ?? null,
      message: apiResponse?.message ?? null,
    });
  };

  const handleDeleteButtonClick = async () => {
    setVisual({
      ...visual,
      loading: true,
    });
    const apiResponse = await deleteVisual(authContext.token, id);
    setVisual({
      ...visual,
      loading: false,
      data: apiResponse?.data ?? null,
      message: apiResponse?.message ?? null,
      deleted: apiResponse.statusCode === 204,
    });
  };

  const handleCommentFormChange = ({ target: { name, value } }) => {
    setCommentFormData({
      text: value,
    });
  };

  const handleCommentFormSubmit = async () => {
    setVisual({
      ...visual,
      loading: true,
    });
    const apiResponse = await addComment(authContext.token, id, {
      text: commentFormData.text,
    });
    setVisual({
      ...visual,
      loading: false,
      data: apiResponse?.data ?? null,
      message: apiResponse?.message ?? null,
    });
    setCommentFormData({
      text: "",
    });
  };

  if (visual.message) {
    return (
      <div>
        Error: <b> {visual.message}</b>
      </div>
    );
  }

  if (visual.deleted) {
    return <div>Image does not exist.</div>;
  }

  if (visual.data) {
    const {
      url,
      description,
      people,
      landmarks,
      reactions: { likes, dislikes, comments },
    } = visual.data;

    return (
      <Segment basic loading={visual.loading}>
        <Grid divided="vertically" style={{ padding: "10px !important" }}>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment padded>
                <Label attached="top" size="big">
                  {description.text}
                </Label>
                <Image src={url} />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <Header>Actions</Header>
              <Statistic.Group size="mini">
                <Statistic
                  className={authContext?.user ? "vis-app-stats-element" : ""}
                  onClick={authContext?.user ? handleLikeButtonClick : () => {}}
                >
                  <Statistic.Value>
                    <Icon
                      name="thumbs up"
                      color={
                        authContext?.user && likes.includes(authContext.user.id)
                          ? "violet"
                          : "black"
                      }
                    />
                    &nbsp;
                    {likes.length}
                  </Statistic.Value>
                  <Statistic.Label>Agree?</Statistic.Label>
                </Statistic>
                <Statistic
                  className={authContext?.user ? "vis-app-stats-element" : ""}
                  onClick={
                    authContext?.user ? handleDislikeButtonClick : () => {}
                  }
                >
                  <Statistic.Value>
                    <Icon
                      name="thumbs down"
                      color={
                        authContext?.user &&
                        dislikes.includes(authContext.user.id)
                          ? "violet"
                          : "black"
                      }
                    />
                    &nbsp;
                    {dislikes.length}
                  </Statistic.Value>
                  <Statistic.Label>Disagree?</Statistic.Label>
                </Statistic>
                {authContext?.user && type !== "public" && (
                  <Statistic
                    className="vis-app-stats-element"
                    onClick={handleDeleteButtonClick}
                  >
                    <Statistic.Value>
                      <Icon name="trash" />
                    </Statistic.Value>
                    <Statistic.Label>Delete</Statistic.Label>
                  </Statistic>
                )}
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <Header>Landmarks</Header>
              {landmarks.map((item) => (
                <Label key={item.replaceAll(" ", "")}>{item}</Label>
              ))}
              {landmarks.length === 0 && <div>None found</div>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header>People</Header>
              {people.map((item) => (
                <Label key={item.replaceAll(" ", "")}>{item}</Label>
              ))}
              {people.length === 0 && <div>None found</div>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Comment.Group>
                <Header as="h3">Comments</Header>
                {comments.map((comment) => (
                  <Comment key={comment.id}>
                    <Comment.Avatar src={dummyUserAvatar} />
                    <Comment.Content>
                      <Comment.Author>{comment.author}</Comment.Author>
                      <Comment.Metadata>
                        <div>{new Date(comment.ts).toUTCString()}</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.text}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}

                {authContext?.user && (
                  <Form reply onSubmit={handleCommentFormSubmit}>
                    <Form.TextArea
                      value={commentFormData.text}
                      onChange={handleCommentFormChange}
                    />
                    <Button
                      content="Add Comment"
                      labelPosition="left"
                      icon="edit"
                      type="submit"
                      primary
                    />
                  </Form>
                )}
              </Comment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }

  return (
    <Segment basic loading={visual.loading}>
      Loading
    </Segment>
  );
};
