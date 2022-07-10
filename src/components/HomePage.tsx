import React from "react";
import TopBar from "./TopBar";
import "./HomePage.css";
import PostUser from "./PostUser";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const HomePage = () => {
  const [user, setUser] = React.useState({
    us: localStorage.getItem("Loggato") || "sconosciuto",
    change: false,
  });
  const [test, setTest] = React.useState(
    JSON.parse(localStorage.getItem("PostTotalielement") || "[{}]") || [{}]
  );
  const [newPost, setNewPost] = React.useState("");

  React.useEffect(() => {
    console.log(JSON.stringify(test));
    localStorage.setItem("PostTotalielement", JSON.stringify(test));
    setUser((prevState) => ({
      ...prevState,
      change: !user.change,
    }));
  }, [test]);

  return (
    <>
      <TopBar />
      <div
        className="homeContainer"
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          className="writeSomething"
          style={{
            flex: "2",
          }}
        >
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
                      onClick={() => {
                        console.log("preme");
                      }}
                      alt=""
                    />
                    <span className="shareOptionText">emoticons</span>
                  </div>
                </div>
                <button
                  className="shareButton"
                  onClick={() => {
                    const numberPost = localStorage.getItem("PostTotali");

                    const newnumber = Number(numberPost) + 1;

                    var newItem = {
                      id: newnumber,
                      user: user.us,
                      description: newPost,
                      print: "",
                    };

                    setTest([...test, newItem]);

                    localStorage.setItem("PostTotali", "" + newnumber);
                    setNewPost("");
                  }}
                >
                  condividi
                </button>
              </div>
            </div>
          </div>
          {/* {console.log("test" + JSON.stringify(test))} */}
          <PostUser user={user.us || "sconosciuto"} />
          <PostUser user={"Francy00" || "sconosciuto"} />
          {/* {stampaNewPost(test)} */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
