import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ApiContext, Comment, Post } from "../components/api";

const StyledCounter = styled.div`
  margin-top: 20px;
`;
export const Comments = () => {
  const location = useLocation();
  const post = location.state as any;
  const api = useContext(ApiContext);

  const singlePost: Post = post.post;
  const queryClient = useQueryClient();
  const [valueComment, setValueComment] = React.useState("");
  const { status: statusComment, data: comments } = useQuery(
    ["comment"],
    async () => {
      return await api.getComment(singlePost.id);
    }
  );
  const { status, data: utenteConnesso } = useQuery(
    ["currentUser"],
    async () => {
      return await api.getCurrentUser();
    }
  );

  return (
    <>
      {statusComment === "loading" || status === "loading" ? (
        <span> </span>
      ) : statusComment === "error" || status === "error" ? (
        <span>error</span>
      ) : (
        <>
          <>
            <Card
              sx={{
                width: "100%%",
                alignContent: "center",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    variant="square"
                    src="asset/social.jpg"
                  ></Avatar>
                }
                title={singlePost.authorUserId}
                subheader={
                  "" +
                  singlePost.date.getDay() +
                  "/" +
                  "" +
                  singlePost.date.getMonth() +
                  "/" +
                  singlePost.date.getFullYear() +
                  " "
                }
                action={
                  <IconButton
                    aria-label="expand"
                    style={{ marginRight: "180px" }}
                  ></IconButton>
                }
                style={{ align: "left", marginRight: "30px" }}
              />
              <Typography fontSize="30px" style={{ paddingLeft: "8px" }}>
                {singlePost.content}
              </Typography>

              <IconButton aria-label="share"></IconButton>
              <IconButton aria-label="add to favorites"></IconButton>
            </Card>
          </>

          <StampaCommenti comments={comments} />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <TextField
                label="Comment"
                id="outlined-size-comment"
                size="small"
                value={valueComment}
                onChange={(event) => {
                  setValueComment(event.currentTarget.value);
                }}
              />
              <Button
                className="returnHome"
                onClick={() => {
                  const timeElapsed = Date.now();
                  const today = new Date(timeElapsed);

                  const newComment: Comment = {
                    userWhoComment: utenteConnesso,
                    idPost: singlePost.id,
                    date: today,
                    comment: valueComment,
                  };
                  api.addComment(newComment);
                  queryClient.invalidateQueries(["comment"]);
                  setValueComment("");
                }}
              >
                invio
              </Button>
              <NavLink to="/homepage" style={{ textDecoration: "none" }}>
                <Button className="returnHome">indietro</Button>
              </NavLink>
            </ListItem>
          </List>
          <StyledCounter> </StyledCounter>
        </>
      )}
    </>
  );
};

export function StampaCommenti({ comments }: { comments: Comment[] }) {
  const newData: any = Object.keys(comments).map((keyName, i) => {
    if (Object.keys(comments[i]).length === 0) {
    } else {
      return (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={comments[i].userWhoComment}
                src="asset/social.jpg"
                variant="square"
              />
            </ListItemAvatar>

            <ListItemText
              primary={comments[i].userWhoComment}
              title={"ddd"}
              style={{ color: "black" }}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comments[i].comment}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      );
    }
  });

  return newData;
}

export function StampaPost({
  post,
  setValueComment,
}: {
  post: Post;
  setValueComment: any;
}) {
  return <></>;
}
