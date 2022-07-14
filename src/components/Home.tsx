import React from "react";
import datas from "./Data";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import "./home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import style from "styled-components";
import { useQuery } from "react-query";
import { createEmptyStorage, createInMemoryApi } from "./inMemomoryApi";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Home = () => {
  const [dense, setDense] = React.useState(false);

  // const [users, setUsers] = React.useState<string[]>(
  //   JSON.parse(localStorage.getItem("Registre") || "[]") || []
  // );
  const [entry, setEntry] = React.useState(false);
  const [theme, setTheme] = React.useState("light-mode");

  const stored = localStorage.getItem("userAndPosts");
  const storage = stored ? JSON.parse(stored) : createEmptyStorage();
  const api = createInMemoryApi(storage);

  const cambiaTema = () => {
    if (theme === "light-mode") {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };

  const { status, data } = useQuery(["user"], async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 5001))
    );
    return await api.getUsers();
  });

  // React.useEffect(() => {
  //   document.documentElement.className = theme;
  // }, [theme]);

  // React.useEffect(() => {
  //   localStorage.setItem("Registre", JSON.stringify(users));
  // }, [users]);

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

  function stampaNewUserd() {
    const newData = data?.map((data) => {
      return (
        <>
          <Demo>
            <List dense={dense}>
              <NavLink to="/homepage" style={{ textDecoration: "none" }}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={data.name}
                    onClick={() => {
                      localStorage.setItem("Loggato", data.name);
                    }}
                  />
                </ListItem>
              </NavLink>
            </List>
          </Demo>
        </>
      );
    });

    return newData;
  }

  const newData = datas.map((data) => {
    return (
      <Demo>
        <List dense={dense}>
          <NavLink to="/homepage" style={{ textDecoration: "none" }}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                {" "}
                <Avatar>{/* <FolderIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data.nick}
                onClick={() => {
                  localStorage.setItem("Loggato", data.nick);
                }}
              />
            </ListItem>
          </NavLink>
        </List>
      </Demo>
    );
  });

  return (
    <>
      <h1 className="title">
        <span
          className="firstName"
          onClick={() => {
            cambiaTema();
          }}
        >
          AMI
        </span>
        <span className="title2">COS</span>
      </h1>

      <div>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Button className="buttonLogin" variant="contained">
            Sign In
          </Button>
        </NavLink>
      </div>

      {status === "loading" ? (
        <span>
          {" "}
          <Spinner />
        </span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>{stampaNewUserd()}</>
      )}

      <div className="grid-container">
        <Grid item xs={12} md={6}></Grid>
        {/* {newData} */}
      </div>
    </>
  );
};

export default Home;
