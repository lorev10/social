import React from "react";
import TopBar from "./TopBar";
import "./HomePage.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import PostUser from "./PostUser";
// import { EmojiEmotions } from "@material-ui/icons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
// import InputEmoji from "react-input-emoji";
const HomePage = () => {
  const [user, setUser] = React.useState({
    us: localStorage.getItem("Loggato") || "sconosciuto",
    change: false,
  });
  const [post, setPost] = React.useState("");
  const [test, setTest] = React.useState(
    JSON.parse(localStorage.getItem("PostTotalielement") || "[{}]") || [{}]
  );
  const [newPost, setNewPost] = React.useState("");
  const [oldPost, setOldPost] = React.useState("");

  React.useEffect(() => {
    console.log(JSON.stringify(test));
    localStorage.setItem("PostTotalielement", JSON.stringify(test));
    setUser((prevState) => ({
      ...prevState,
      change: !user.change,
    }));
  }, [test]);

  function stampaNewPost(data: any) {
    let datat: any;
    console.log(JSON.stringify(data));

    //dovrebbe essere sistemato puoi testarlo senza controllo
    if (Object.keys(data).length === 1) {
      console.log("entro");
      datat = JSON.parse(localStorage.getItem("PostTotalielement") || "[]");
      // setPost(datat)
      console.log(JSON.stringify(datat));
    } else {
      datat = data;
    }
    const newData = Object.keys(datat).map((keyName, i) => {
      if (Object.keys(datat[i]).length === 0) {
      } else {
        return (
          <>
            {console.log("element:" + JSON.stringify(data[i]))}

            <div className="grid-item" key={i}>
              <NavLink to="/homepage" style={{ textDecoration: "none" }}>
                <Card style={{ marginTop: "10px" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "f44336", backgroundColor: "red" }}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    title={"scritto da:" + datat[i].user}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 28 }}
                      color="text.primary"
                      gutterBottom
                    >
                      {datat[i].description}
                    </Typography>
                    <div className="shareOptions">
                      <div className="shareOption">
                        <ThumbUpIcon htmlColor="blue" className="ThumbUpIcon" />
                        <span className="shareOptionText">like</span>
                      </div>
                      <div className="shareOption"></div>

                      <div className="shareOption">
                        {/* <EmojiEmotions
                          htmlColor="goldenrod"
                          className="shareIcon"
                        /> */}
                        <span className="shareOptionText">emoticons</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            </div>
          </>
        );
      }
    });

    return newData;
  }

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
                    {/* <EmojiEmotions */}
                    {/* htmlColor="goldenrod"
                      className="shareIcon"
                    /> */}
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
