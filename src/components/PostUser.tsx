import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "./api";
import "./HomePage.css";
import "./PostUser.css";
import style from "styled-components";

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

const PostUser = ({ user }: { user: string }) => {
  const api = useContext(ApiContext);

  const { status, data } = useQuery(["currentUser"], async () => {
    return await api.getPostUser(user);
  });
  // const location = useLocation();
  // const user = location.state as string

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
        console.log(data)
        // <>{stampaNewPost(data)}</>
      )}
    </>
  );

  function stampaNewPost(datat: any) {
    const newData: any = Object.keys(datat).map((keyName, i) => {
      console.log("entro" + JSON.stringify(datat[i]));
      if (Object.keys(datat[i]).length === 0) {
        console.log("nessun dato");
      } else {
        if (datat[i].user === user) {
          return (
            <>
              {console.log(datat[i])}
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
                        {datat[i].authorUserId}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="30px"
                    >
                      {datat[i].content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <img
                    className="likeIcon"
                    src="asset/like.png"
                    // onClick={() => {
                    //   let IsLike =
                    //     JSON.parse(
                    //       localStorage.getItem(
                    //         userLog + "islike" + datat[i].id
                    //       ) || "[]"
                    //     ) || [];

                    //   if (IsLike[i] === null || IsLike[i] === undefined) {
                    //     IsLike[i] = false;
                    //   }

                    //   let scelta = [...IsLike];

                    //   scelta[i] = !scelta[i];

                    //   setIsLiked(scelta);

                    //   if (IsLike[i] === false) {
                    //     let like =
                    //       JSON.parse(
                    //         localStorage.getItem("likepost" + datat[i].id) ||
                    //           "[]"
                    //       ) || [];

                    //     if (like[i] === null || like[i] === undefined) {
                    //       like[i] = "0";
                    //     }

                    //     let number = parseInt(like[i]) + 1;

                    //     setNumberId(datat[i].id);

                    //     let newArr = [...testLike];
                    //     newArr[i] = number;
                    //     setTestLike(newArr);
                    //   } else {
                    //     let like =
                    //       JSON.parse(
                    //         localStorage.getItem("likepost" + datat[i].id) ||
                    //           "[]"
                    //       ) || [];

                    //     if (like[i] === null || like[i] === undefined) {
                    //       like[i] = "0";
                    //     }

                    //     let number = parseInt(like[i]) - 1;

                    //     setNumberId(datat[i].id);

                    //     let newArr = [...testLike];
                    //     newArr[i] = number;
                    //     setTestLike(newArr);
                    //   }
                    // }}
                    alt=""
                  />
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
};
export default PostUser;
