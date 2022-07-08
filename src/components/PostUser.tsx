import React from "react";
import "./HomePage.css";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import "./PostUser.css";
const PostUser = ({ user }: { user: string }) => {
  const [isLiked, setIsLiked] = React.useState<boolean[]>([]);
  const [numberId, setNumberId] = React.useState<number>(0);
  const [testLike, setTestLike] = React.useState<number[]>([]);

  React.useEffect(() => {
    localStorage.setItem("likepost" + numberId, "" + JSON.stringify(testLike));
  }, [testLike]);

  React.useEffect(() => {
    console.log("cio" + isLiked);
    localStorage.setItem(
      user + "islike" + numberId,
      "" + JSON.stringify(isLiked)
    );
    const test =
      JSON.parse(localStorage.getItem(user + "islike" + numberId) || "[]") ||
      [];
    console.log(test);
  }, [isLiked]);

  function stampaNewPost() {
    const datat = JSON.parse(
      localStorage.getItem("PostTotalielement") || "error"
    );
    const newData = Object.keys(datat).map((keyName, i) => {
      if (Object.keys(datat[i]).length === 0) {
      } else {
        if (datat[i].user === user) {
          return (
            <>
              <div className="post">
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      <img
                        className="postProfileImg"
                        src="asset/social.jpg"
                        alt=""
                      />
                      <span className="postUsername">{datat[i].user}</span>
                      {/* <span className="postDate">{post.date}</span> */}
                    </div>
                    <div className="postTopRight">{/* <MoreVert /> */}</div>
                  </div>
                  <div className="postCenter">
                    <span className="postText">{datat[i].description}</span>
                    {/* <img className="postImg" src={post.photo} alt="" /> */}
                  </div>
                  <div className="postBottom">
                    <div className="postBottomLeft">
                      <img
                        className="likeIcon"
                        src="asset/like.png"
                        onClick={() => {
                          let IsLike =
                            JSON.parse(
                              localStorage.getItem(
                                user + "islike" + datat[i].id
                              ) || "[]"
                            ) || [];

                          if (IsLike[i] === null || IsLike[i] === undefined) {
                            IsLike[i] = false;
                          }

                          let scelta = [...IsLike]; // copying the old datas array

                          scelta[i] = !scelta[i]; // replace e.target.value with whatever you want to change it to

                          setIsLiked(scelta);

                          if (IsLike[i] === false) {
                            let like =
                              JSON.parse(
                                localStorage.getItem(
                                  "likepost" + datat[i].id
                                ) || "[]"
                              ) || [];

                            if (like[i] === null || like[i] === undefined) {
                              like[i] = "0";
                            }

                            let number = parseInt(like[i]) + 1;

                            setNumberId(datat[i].id);

                            let newArr = [...testLike]; // copying the old datas array
                            newArr[i] = number; // replace e.target.value with whatever you want to change it to
                            setTestLike(newArr);
                          } else {
                            let like =
                              JSON.parse(
                                localStorage.getItem(
                                  "likepost" + datat[i].id
                                ) || "[]"
                              ) || [];

                            if (like[i] === null || like[i] === undefined) {
                              like[i] = "0";
                            }

                            let number = parseInt(like[i]) - 1;

                            setNumberId(datat[i].id);

                            let newArr = [...testLike]; // copying the old datas array
                            newArr[i] = number; // replace e.target.value with whatever you want to change it to
                            setTestLike(newArr);
                          }
                        }}
                        alt=""
                      />

                      <img
                        className="likeIcon"
                        src="asset/heart.png"
                        onClick={() => {
                          console.log("preme");
                        }}
                        alt=""
                      />
                      <span className="postLikeCounter">
                        {testLike[i]} persone a cui piace
                      </span>
                    </div>
                    <div className="postBottomRight">
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
                  </div>
                </div>
              </div>
            </>
          );
        }
      }
    });

    return newData;
  }
  return <div>{stampaNewPost()}</div>;
};

export default PostUser;