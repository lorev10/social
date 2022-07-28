import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
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
import { Api, ApiContext, User } from "../components/api";

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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const StyledTyppgraphy = styled(Typography)`
  color: black;
  font-family: Arial Black;
`;

const StyledList = styled(List)`
  border: black;
`;

const Home = () => {
  const [dense, setDense] = React.useState(false);
  const api = useContext(ApiContext);

  const { status, data } = useQuery(["userRegister"], async () => {
    return await api.getUsers();
  });

  return (
    <>
      <h1 className="title">
        <span style={{ color: "#c29436" }} className="firstName">
          AMI
        </span>
        <span className="title2">COS</span>
      </h1>

      <div>
        <StyledNavLink to="/login">
          <Button className="buttonLogin" variant="contained">
            Sign In
          </Button>
        </StyledNavLink>
      </div>

      {status === "loading" ? (
        <span>
          {" "}
          <Spinner />
        </span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>
          {data?.map((data) => {
            return (
              <>
                <StyledList dense={dense}>
                  <StyledNavLink to="/homepage">
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
                          <StyledTyppgraphy key={data.name}>
                            {data.name}
                          </StyledTyppgraphy>
                        }
                        onClick={() => {
                          api.login(data.name);
                        }}
                      />
                    </ListItem>
                  </StyledNavLink>
                </StyledList>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default Home;
