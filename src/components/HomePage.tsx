import React, { useContext } from "react";
import TopBar from "./TopBar";
import "./HomePage.css";
import PostUser from "./PostUser";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Padding } from "@mui/icons-material";
import styled from "styled-components";
import { ApiContext, Post } from "./api";
import { useQuery } from "react-query";
import style from "styled-components";

const writePost = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const HomePage = () => {
  const api = useContext(ApiContext);

  const { status, data } = useQuery(["currentUser"], async () => {
    return await api.getCurrentUser();
  });

  // const [user, setUser] = React.useState({
  //   us: data,
  //   change: false,
  // });

  const [test, setTest] = React.useState(
    JSON.parse(localStorage.getItem("PostTotalielement") || "[{}]") || [{}]
  );
  const [newPost, setNewPost] = React.useState("");
  // const [allFriend, setAllFriend] = React.useState<string[]>(
  //   JSON.parse(localStorage.getItem("FriendOf" + user.us) || "[]") || []
  // );
  // React.useEffect(() => {
  //   localStorage.setItem("PostTotalielement", JSON.stringify(test));
  //   setUser((prevState) => ({
  //     ...prevState,
  //     change: !user.change,
  //   }));
  // }, [test]);

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

  return (
    <>
      {status === "loading" ? (
        <span>
          {" "}
          <Spinner />
        </span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>
          <TopBar />
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
                <Button>ss</Button>
                <button
                  className="shareButton"
                  onClick={() => {
                    const numberPost = localStorage.getItem("PostTotali");

                    const newnumber = Number(numberPost) + 1;

                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    //inserire id
                    const newPostItem: Post = {
                      id: "4",
                      content: newPost,
                      authorUserId: data || "sconosciuto",
                      date: today,
                      isLike: false,
                      numberOfLike: 0,
                    };

                    api.addPost(newPostItem);
                  }}
                >
                  condividi
                </button>
              </div>
            </div>
          </div>
          <PostUser user={data || "sconosciuto"} />
        </>
      )}
    </>
  );
};

export default HomePage;
