import React, { useContext } from "react";
import datas from "./Data";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import style from "styled-components";
import { useQuery } from "react-query";
import { createEmptyStorage, createInMemoryApi } from "./inMemomoryApi";
import { ApiContext } from "./api";

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

const Home = () => {
  const [dense, setDense] = React.useState(false);
  const api = useContext(ApiContext);

  const { status, data } = useQuery(["user"], async () => {
    return await api.getUsers();
  });

  function stampaNewUserd() {
    const newData = data?.map((data) => {
      return (
        <>
          <List dense={dense} style={{ background: "#9575cd" }}>
            <NavLink to="/homepage" style={{ textDecoration: "none" }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{}</Avatar>
                </ListItemAvatar>

                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      style={{ fontFamily: "Arial Black", color: "white" }}
                    >
                      {data.name}
                    </Typography>
                  }
                  onClick={() => {
                    localStorage.setItem("Loggato", data.name);
                  }}
                />
              </ListItem>
            </NavLink>
          </List>
        </>
      );
    });

    return newData;
  }

  return (
    <>
      <h1 className="title">
        <span style={{ color: "#c29436" }} className="firstName">
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
