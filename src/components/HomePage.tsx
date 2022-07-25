import React, { useContext } from "react";
import TopBar from "./TopBar";
import PostUser from "./PostUser";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Padding } from "@mui/icons-material";
import styled from "styled-components";
import { ApiContext, Post } from "./api";
import { QueryClient, useMutation, useQuery } from "react-query";
import style from "styled-components";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import PrintPostUser from "./PrintPostUser";

const writePost = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Button = styled.button`
  border-radius: 5px;
  border: 5px solid green;
  color: green;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

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

  const { status, data: utenteConnesso } = useQuery(
    ["currentUser"],
    async () => {
      return await api.getCurrentUser();
    }
  );
  const currentUser = utenteConnesso || "";

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
      return await api.getPostUser(currentUser || "error");
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
    {
      enabled: !!currentUser,
    }
  );
  //refresh query quando clicca condividi
  const handleClick = () => {
    refatchAllPost();
    refatchId();
  };
  const [newPost, setNewPost] = React.useState("");
  const queryClient = new QueryClient();

  function stampaPost(posts: Post[], user: string) {
    const newData: any = Object.keys(posts).map((keyName, i) => {
      if (Object.keys(posts[i]).length === 0) {
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
                      {posts[i].authorUserId}
                    </Typography>
                  </div>
                </CardContent>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="30px"
                  >
                    {posts[i].content}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <img
                  className="likeIcon"
                  src="asset/like.png"
                  alt=""
                  onClick={() => {
                    api.likePost(posts[i].id);
                    queryClient.invalidateQueries(["idPost"]);
                    queryClient.invalidateQueries(["allPost"]);
                    handleClick();
                    console.log("sto cliccando");
                  }}
                />
                piace a {posts[i].numberOfLike}
              </CardActions>
            </Card>
          </>
        );
      }
    });
    return newData;
  }

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
          <h1>Benvenuto {utenteConnesso}</h1>
          <input
            placeholder="Cosa stai pensando? "
            value={newPost}
            onChange={(event) => {
              setNewPost(event.currentTarget.value);
            }}
          />
          {/* <Button>ss</Button> */}
          <ButtonCondividi
            onClick={() => {
              const timeElapsed = Date.now();
              const today = new Date(timeElapsed);

              //inserire id
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
              handleClick();
            }}
          >
            condividi
          </ButtonCondividi>
          {/* {console.log(JSON.stringify("gli amici sono" + nameFriends))} */}
          {stampaPost(allPost, utenteConnesso)}
          <PrintPostUser user={nameFriends} />
        </>
      )}
    </>
  );
};

export default HomePage;
