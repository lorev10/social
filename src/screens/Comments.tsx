import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
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

const StyledSection = styled.section`
  width: 1366px;
  height: 768px;
`;

const StyledCounter = styled.div`
  margin-top: 20px;
`;
export const Comments = () => {
  const location = useLocation();
  const post = location.state as any;
  const api = useContext(ApiContext);

  const singlePost: Post = post.post;
  const user: string = post.userLoggato;
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
          <StyledCounter>
            <Card
              style={{
                width: "350px",
                marginLeft: "1%",
                marginTop: "30px",
                borderRadius: "15px",
              }}
            >
              <CardActionArea>
                <CardContent style={{ display: "flex", gap: "16px" }}>
                  <div>
                    <Avatar alt="Remy Sharp" src="asset/social.jpg" />
                  </div>
                  <div>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.authorUserId} (POST)
                    </Typography>
                  </div>
                </CardContent>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="30px"
                  >
                    {post.content}
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    label="lascia un commento:"
                    variant="outlined"
                    onChange={(event) => {
                      setValueComment(event.currentTarget.value);
                    }}
                  />
                  <Button
                    className="returnHome"
                    variant="contained"
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
                    }}
                  >
                    invio
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </StyledCounter>
          <StyledCounter>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
          </StyledCounter>
          <StampaCommenti comments={comments} />
          <StyledCounter>
            {" "}
            <NavLink to="/homepage" style={{ textDecoration: "none" }}>
              <Button className="returnHome" variant="contained">
                indietro
              </Button>
            </NavLink>
          </StyledCounter>
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
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={comments[i].userWhoComment}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>

            <ListItemText
              primary={comments[i].userWhoComment}
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
