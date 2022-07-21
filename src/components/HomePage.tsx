import React, { useContext } from "react";
import TopBar from "./TopBar";
import "./HomePage.css";
import PostUser from "./PostUser";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Padding } from "@mui/icons-material";
import styled from "styled-components";
import { ApiContext, Post } from "./api";
import { QueryClient, useQuery } from "react-query";
import style from "styled-components";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const writePost = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Button = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const buttonCondividi = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
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

function stampaPost(posts: Post[], user: string) {
  const newData: any = Object.keys(posts).map((keyName, i) => {
    if (Object.keys(posts[i]).length === 0) {
      console.log("nessun dato");
    } else {
      if (posts[i].authorUserId === user) {
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
                <img className="likeIcon" src="asset/like.png" alt="" />
                <img
                  className="likeIcon"
                  src="asset/Heart-image.png"
                  onClick={() => {
                    console.log("preme");
                  }}
                  alt=""
                />
                <div className="destra">
                  <span className="postCommentText">
                    {" "}
                    <img
                      className="likeIcon"
                      src="asset/commenta.png"
                      onClick={() => {
                        // addRemove;
                      }}
                      alt=""
                    />
                  </span>
                </div>
              </CardActions>
            </Card>
          </>
        );
      }
    }
  });
  return newData;
}
const HomePage = () => {
  const api = useContext(ApiContext);

  const { status, data: utenteConnesso } = useQuery(
    ["currentUser"],
    async () => {
      return await api.getCurrentUser();
    }
  );
  const userC = utenteConnesso;

  const {
    status: secondQueryStatus,
    data: idPost,
    refetch: refatchId,
  } = useQuery(["idPost", userC], api.getIdNewPost, {
    enabled: !!userC,
  });

  const {
    status: thirdQueryStatus,
    data: allPost,
    refetch: refatchAllPost,
  } = useQuery(
    ["allPost", userC],
    async () => {
      return await api.getPostUser(userC || "error");
    },
    {
      enabled: !!userC,
    }
  );
  const handleClick = () => {
    refatchAllPost();
    refatchId();
  };
  const [newPost, setNewPost] = React.useState("");
  const queryClient = new QueryClient();

  return (
    <>
      <TopBar />

      {status === "loading" ||
      secondQueryStatus === "loading" ||
      thirdQueryStatus === "loading" ? (
        <span>
          {" "}
          <Spinner />
        </span>
      ) : status === "error" ||
        secondQueryStatus === "error" ||
        thirdQueryStatus === "error" ? (
        <span>error</span>
      ) : (
        <>
          <h1>Benvenuto {utenteConnesso}</h1>
          <div className="share">
            <div className="shareWrapper">
              <div className="shareTop">
                <input
                  placeholder="Cosa stai pensando? "
                  className="shareInput"
                  value={newPost}
                  onChange={(event) => {
                    setNewPost(event.currentTarget.value);
                  }}
                />
              </div>
              <hr className="shareHr" />
              <div className="shareBottom">
                <div className="shareOptions">
                  <div className="shareOption">
                    <ThumbUpIcon htmlColor="blue" className="ThumbUpIcon" />
                    <span className="shareOptionText">like</span>
                  </div>
                  <div className="shareOption"></div>

                  <div className="shareOption">
                    <img
                      className="likeIcon"
                      src="asset/emot.png"
                      onClick={() => {}}
                      alt=""
                    />
                    <span className="shareOptionText">emoticons</span>
                  </div>
                </div>
                {/* <Button>ss</Button> */}
                <button
                  className="shareButton"
                  onClick={() => {
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    //inserire id
                    const newPostItem: Post = {
                      id: idPost,
                      content: newPost,
                      authorUserId: utenteConnesso || "sconosciuto",
                      date: today,
                      isLike: false,
                      numberOfLike: 0,
                    };

                    api.addPost(newPostItem);
                    queryClient.invalidateQueries(["idPost"]);
                    queryClient.invalidateQueries(["allPost"]);
                    handleClick();
                  }}
                >
                  condividi
                </button>
              </div>
            </div>
          </div>
          {stampaPost(allPost, utenteConnesso)}
          {console.log("allPost:" + JSON.stringify(allPost))}

          {/* <MyPost user={utenteConnesso} /> */}
        </>
      )}

      {/* <PostUser user={data || "sconosciuto"} /> */}
    </>
  );
};

export default HomePage;
