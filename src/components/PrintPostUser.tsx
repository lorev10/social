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
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";

export default function PrintPostUser(props: any) {
  const api = useContext(ApiContext);
  const userLoggato = props.user;
  const [numberOfLik, setNumberOfLik] = React.useState(0);

  const { status, data: postUsers } = useQuery(
    ["PostUsersFriend"],
    async () => {
      return await api.getPostsUsers(userLoggato);
    }
  );

  function stampaPost(posts: Post[]) {
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
                  style={{ height: "30px" }}
                  onClick={() => {
                    api.likePost(userLoggato, posts[i].id);

                    setNumberOfLik(posts[i].numberOfLike);
                  }}
                />
                piace a{" "}
                {numberOfLik === 0 ? posts[i].numberOfLike : numberOfLik}
                <NavLink
                  to="/comments"
                  state={{ post: posts[i], userLoggato: userLoggato }}
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
    });
    return newData;
  }
  return (
    <>
      {status === "loading" ? (
        <span> </span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>{stampaPost(postUsers)}</>
      )}
    </>
  );
}

export function StampaCommenti({ comments }: { comments: Comment[] }) {}
