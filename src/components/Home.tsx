import React from "react";
import data from "./Data";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import "./home.css";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
const Home = () => {
  const [users, setUsers] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("Registre") || "[]") || []
  );
  const [entry, setEntry] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("Registre", JSON.stringify(users));
  }, [users]);

  function stampaNewUserd(data: string[]) {
    const newData = data.map((data) => {
      return (
        <div className="grid-item" key={data}>
          <NavLink to="/homepage" style={{ textDecoration: "none" }}>
            <Card className="card" sx={{ maxWidth: 520 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "f44336", backgroundColor: "red" }}
                    aria-label="recipe"
                  >
                    {data[0]}
                  </Avatar>
                }
                title={data}
                onClick={() => {
                  localStorage.setItem("Loggato", data);
                }}
              />
            </Card>
          </NavLink>
        </div>
      );
    });
    return newData;
  }

  const newData = data.map((data) => {
    return (
      <div className="grid-item" key={data.nick}>
        <NavLink to="/homepage" style={{ textDecoration: "none" }}>
          <Card className="card" style={{ maxWidth: 520 }}>
            <CardHeader
              avatar={<Avatar className="avatar">{data.nick[0]}</Avatar>}
              title={data.nick}
              onClick={() => {
                setEntry(true);
                localStorage.setItem("Loggato", data.nick);
              }}
            />
          </Card>
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <h1 className="title">
        <span style={{ color: "black" }}>AMI</span>
        <span style={{ color: "red" }}>COS</span>
      </h1>

      <div>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Button className="buttonLogin" variant="contained">
            Sign In
          </Button>
        </NavLink>
      </div>
      <div className="grid-container">
        {newData}

        {stampaNewUserd(users)}
      </div>
    </>
  );
};

export default Home;
