import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import { ApiContext } from "./api";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

export default function PrintPostUser(props: any) {
  const api = useContext(ApiContext);
  const userLoggato = props.user;
  const [numberOfLik, setNumberOfLik] = React.useState(0);
  const queryClient = useQueryClient();

  const {
    status,
    data: postUsers,
    refetch: refetchPostUserAndFriend,
  } = useQuery(["PostUsersFriend"], async () => {
    return await api.getPostsUsers(userLoggato);
  });
  const { status: statusUserConnected, data: userConnected } = useQuery(
    ["userConnected"],
    async () => {
      return await api.getCurrentUser();
    }
  );

  React.useEffect(() => {
    queryClient.invalidateQueries(["idPost"]);
    queryClient.invalidateQueries(["allPost"]);
    refreshQueryOnClick();
  }, [numberOfLik]);

  const refreshQueryOnClick = () => {
    refetchPostUserAndFriend();
  };
  return (
    <>
      {status === "loading" || statusUserConnected === "loading" ? (
        <span> </span>
      ) : status === "error" || statusUserConnected === "error" ? (
        <span>error</span>
      ) : (
        <>
          {Object.keys(postUsers).map((keyName, i) => {
            if (Object.keys(postUsers[i]).length === 0) {
            } else {
              return (
                <Card
                  style={{
                    width: "365.3px",
                    marginLeft: "1%",
                    marginRight: "1%",
                    marginTop: "30px",
                    borderRadius: "15px",
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
                    title={postUsers[i].authorUserId}
                    subheader={
                      "" +
                      postUsers[i].date.getDay() +
                      "/" +
                      "" +
                      postUsers[i].date.getMonth() +
                      "/" +
                      postUsers[i].date.getFullYear() +
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
                    {postUsers[i].content}
                  </Typography>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon
                        onClick={() => {
                          api.likePost(userConnected, postUsers[i].id);
                          const value = api.IsLikePost(
                            userConnected,
                            postUsers[i].id
                          );
                          api.changeValueIsLikePost(
                            userConnected,
                            postUsers[i].id
                          );
                          api.SetClickLike(userConnected, postUsers[i].id);
                          setNumberOfLik(postUsers[i].numberOfLike);
                        }}
                      />
                      piace a {postUsers[i].numberOfLike}
                    </IconButton>
                    <StyledNavLink
                      to="/comments"
                      state={{ post: postUsers[i], userLoggato: userConnected }}
                    >
                      <IconButton aria-label="add to favorites">
                        <ChatBubbleOutlineIcon /> commenti
                      </IconButton>
                    </StyledNavLink>
                  </CardActions>
                </Card>
              );
            }
          })}
        </>
      )}
    </>
  );
}
