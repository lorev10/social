import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@mui/material";
import { ApiContext, Post } from "./api";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";

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
                <>
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
                            {postUsers[i].authorUserId}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize="30px"
                        >
                          {postUsers[i].content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <img
                        className="likeIcon"
                        src="asset/like.png"
                        alt=""
                        style={{ height: "30px" }}
                        onClick={() => {
                          api.likePost(userConnected, postUsers[i].id);
                          const value = api.IsLikePost(
                            userConnected,
                            postUsers[i].id
                          );
                          api.SetClickLike(userConnected, postUsers[i].id);
                          setNumberOfLik(postUsers[i].numberOfLike);
                        }}
                      />
                      piace a{" "}
                      {numberOfLik === 0
                        ? postUsers[i].numberOfLike
                        : numberOfLik}
                      <NavLink
                        to="/comments"
                        state={{ post: postUsers[i], userLoggato: userLoggato }}
                      >
                        <img
                          src="asset/commenta.png"
                          alt=""
                          style={{ height: "30px" }}
                          onClick={() => {}}
                        />
                      </NavLink>
                    </CardActions>
                  </Card>
                </>
              );
            }
          })}
        </>
      )}
    </>
  );
}
