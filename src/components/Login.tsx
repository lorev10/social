import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./Login.css";
import { NavLink } from "react-router-dom";

export const Login = () => {
  function IsRegistre(username: string) {
    const test = JSON.parse(localStorage.getItem("Registre") || "er");
    if (test === "er") {
      return false;
    }
    if (test.indexOf(username) !== -1) {
      return true;
    }
    return false;
  }

  function IsPresent(username: string, users: Array<string>) {
    if (users.indexOf(username) !== -1) {
      return true;
    }
    return false;
  }

  const [newUser, setNewUser] = React.useState("");
  const [users, setUsers] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("Registre") || "[]") || []
  );
  const [alertPresent, setAlertPresent] = React.useState(false);
  const [alertInsert, setAlertInsert] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("Registre", JSON.stringify(users));
  }, [users]);

  function disableAlert() {
    setTimeout(() => {
      setAlertPresent(false);
    }, 2000);
  }

  function disableSuccess() {
    setTimeout(() => {
      setAlertInsert(false);
    }, 2000);
  }
  return (
    <>
      <div className="divTable blueTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell">
              <h1>
                <span style={{ color: "black" }}>AMI</span>
                <span style={{ color: "red" }}>COS</span>
              </h1>
            </div>
          </div>
          <div className="divTableRow">
            <div className="divTableCell">
              <div>
                {" "}
                {alertPresent ? (
                  <Alert severity="error">Utente già inserito</Alert>
                ) : (
                  <></>
                )}
              </div>
              {alertPresent ? <div>disableAlert()</div> : <></>}
              <div>
                {" "}
                {alertInsert ? (
                  <Alert severity="success">Utente inserito</Alert>
                ) : (
                  <></>
                )}
              </div>
              {alertInsert ? <div>disableSuccess()</div> : <></>}
            </div>
          </div>
          <div className="divTableRow">
            <div className="divTableCell">
              {" "}
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
          </div>
          <div className="divTableRow">
            <div className="divTableCell">
              <div className="divTable blueTable">
                <div className="divTableBody">
                  <div className="divTableRow">
                    <div className="divTableCell">
                      {" "}
                      <Button
                        variant="contained"
                        className="buttonLogin"
                        onClick={() => {
                          if (
                            !IsPresent(newUser, users) &&
                            !IsRegistre(newUser)
                          ) {
                            setUsers((users) => [...users, newUser]);
                            setAlertInsert(true);
                          } else {
                            setAlertPresent(true);
                          }
                        }}
                      >
                        Registra
                      </Button>
                    </div>
                    <div className="divTableCell">
                      <NavLink to="/Home" style={{ textDecoration: "none" }}>
                        <Button className="returnHome" variant="contained">
                          indietro
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
