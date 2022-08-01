import React, { useContext, useEffect } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { ApiContext, Post } from "../components/api";
import { useQuery, useQueryClient } from "react-query";
import style from "styled-components";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import PrintPostUser from "../components/PrintPostUser";
import { NavLink } from "react-router-dom";

const ButtonCondividi = styled.button`
  border: none;
  padding: 3px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  cursor: pointer;
  color: white;
  width: 100px;
`;

const Spinner = style.div`
  border: 10px solid #1966FF;
  border-top: 10px white solid;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  animation: spin 2s linear infinite;
  margin-left:160px;
  margin-top:130px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const HomePage = () => {
  const api = useContext(ApiContext);
  const [numberOfLik, setNumberOfLik] = React.useState(0);
  const { status, data: utenteConnesso } = useQuery(
    ["currentUser"],
    async () => {
      return await api.getCurrentUser();
    }
  );
  const currentUser = utenteConnesso || "";

  useEffect(() => {
    queryClient.invalidateQueries(["idPost"]);
    queryClient.invalidateQueries(["allPost"]);
    refreshQueryOnClick();
  }, [numberOfLik]);

  const {
    status: statusQueryNewPostId,
    data: idPost,
    refetch: refatchId,
  } = useQuery(["idPost", currentUser], api.getIdNewPost, {
    enabled: !!currentUser,
  });

  const {
    status: statusQueryAllPost,
    data: allPost,
    refetch: refatchAllPost,
  } = useQuery(
    ["allPost", currentUser],
    async () => {
      return await api.getPostsOfUser(currentUser || "error");
    },
    {
      enabled: !!currentUser,
    }
  );

  const { status: statusQueryNameFriends, data: nameFriends } = useQuery(
    ["allFriend", currentUser],
    async () => {
      return await api.getFriends(currentUser || "error");
    },
    { enabled: !!currentUser }
  );
  const refreshQueryOnClick = () => {
    refatchAllPost();
    refatchId();
  };
  const [newPost, setNewPost] = React.useState("");
  const queryClient = useQueryClient();

  return (
    <>
      {status === "loading" ||
      statusQueryNewPostId === "loading" ||
      statusQueryAllPost === "loading" ||
      statusQueryNameFriends === "loading" ? (
        <span>
          {" "}
          <Spinner />
        </span>
      ) : status === "error" ||
        statusQueryNewPostId === "error" ||
        statusQueryAllPost === "error" ||
        statusQueryNameFriends === "error" ? (
        <span>error</span>
      ) : (
        <>
          <TopBar />

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
                    {currentUser}
                  </Typography>
                </div>
              </CardContent>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="30px"
                >
                  <input
                    placeholder="Cosa stai pensando? "
                    value={newPost}
                    onChange={(event) => {
                      setNewPost(event.currentTarget.value);
                    }}
                    style={{ border: "none" }}
                  />
                  <ButtonCondividi
                    onClick={() => {
                      const timeElapsed = Date.now();
                      const today = new Date(timeElapsed);

                      const newPostItem: Post = {
                        id: idPost,
                        content: newPost,
                        authorUserId: utenteConnesso || "sconosciuto",
                        date: today,
                        numberOfLike: 0,
                      };

                      api.addPost(newPostItem);
                      api.createConnectionUserPost(utenteConnesso, idPost);
                      queryClient.invalidateQueries(["idPost"]);
                      queryClient.invalidateQueries(["allPost"]);
                      refreshQueryOnClick();
                    }}
                  >
                    condividi
                  </ButtonCondividi>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>

          {Object.keys(allPost).map((keyName, i) => {
            if (Object.keys(allPost[i]).length === 0) {
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
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            key={allPost[i].id}
                          >
                            {allPost[i].authorUserId}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize="30px"
                        >
                          {allPost[i].content}
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
                          api.likePost(currentUser, allPost[i].id);
                          const value = api.IsLikePost(
                            currentUser,
                            allPost[i].id
                          );
                          api.SetClickLike(currentUser, allPost[i].id);
                          setNumberOfLik(allPost[i].numberOfLike);
                        }}
                      />
                      piace a{" "}
                      {numberOfLik === 0
                        ? allPost[i].numberOfLike
                        : numberOfLik}
                      <NavLink
                        to="/comments"
                        state={{ post: allPost[i], userLoggato: currentUser }}
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
          <PrintPostUser user={nameFriends} />
        </>
      )}
    </>
  );
};

export default HomePage;
