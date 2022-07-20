import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import { ApiContext } from "./api";
import styled from "styled-components";
import { useQuery } from "react-query";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

const StyledButtonDistance = styled.span`
  margin-right: 20px;
`;

const StyledCounter = styled.div`
  margin-top: 20px;
`;

export const Login = () => {
  const [newUser, setNewUser] = React.useState("");
  const [users, setUsers] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("Registre") || "[]") || []
  );
  const [alertPresent, setAlertPresent] = React.useState(false);
  const [alertInsert, setAlertInsert] = React.useState(false);
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
        {" "}
        <StyledButtonDistance>
          <Button
            variant="contained"
            className="buttonLogin"
            onClick={() => {
              setNewUser("");
              api.addUser({
                name: newUser,
                id: "" + api.getIdNewUser(),
              });
            }}
          >
            Registra
          </Button>
        </StyledButtonDistance>
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
