import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../components/api";
import styled from "styled-components";

const StyledButtonDistance = styled.span`
  margin-right: 20px;
`;

const StyledCounter = styled.div`
  margin-top: 20px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

export const Login = () => {
  const [newUser, setNewUser] = React.useState("");
  const api = useContext(ApiContext);

  return (
    <>
      <h1 className="title">
        <span style={{ color: "#c29436" }} className="firstName">
          AMI
        </span>
        <span className="title2">COS</span>
      </h1>
      <div>
        <TextField
          id="outlined-basic"
          label="nuovo utente"
          variant="outlined"
          type="text"
          value={newUser}
          onChange={(event) => {
            setNewUser(event.currentTarget.value);
          }}
        />
      </div>
      <StyledCounter>
        <StyledNavLink to="/homepage">
          <StyledButtonDistance>
            <Button
              variant="contained"
              className="buttonLogin"
              onClick={() => {
                setNewUser("");
                api.addUser({
                  name: newUser,
                  id: "" + api.getIdNewUser(),
                  friends: [],
                  request: [],
                });
                api.login(newUser);
              }}
            >
              Registra
            </Button>
          </StyledButtonDistance>
        </StyledNavLink>
        <span>
          <NavLink to="/Home" style={{ textDecoration: "none" }}>
            <Button className="returnHome" variant="contained">
              indietro
            </Button>
          </NavLink>
        </span>
      </StyledCounter>
    </>
  );
};

export default Login;
