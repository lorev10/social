import React, { useContext } from "react";
import Person from "@mui/icons-material/Person";
// import Searcht from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/system";
import {
  AppBar,
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { ApiContext, Post } from "./api";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "react-query";

export default function PrintPostUser(props: any) {
  const [userSearch, setUserSearch] = React.useState("");
  const api = useContext(ApiContext);
  const users = props.user;

  const { status, data: postUsers } = useQuery(
    ["PostUsersFriend"],
    async () => {
      return await api.getPostsUsers(users);
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
                <img className="likeIcon" src="asset/like.png" alt="" />
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
        <>
          {stampaPost(postUsers)}
          {console.log("ddd " + postUsers)}
        </>
      )}
    </>
  );
}
