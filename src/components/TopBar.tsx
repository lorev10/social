import "./topbar.css";
import React from "react";
import Person from "@mui/icons-material/Person";
import { Search } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function Topbar() {
  const user = localStorage.getItem("Loggato");
  const [userSearch, setUserSearch] = React.useState("");
  const [richieste, SetRichieste] = React.useState(
    localStorage.getItem("notification" + user) || "0"
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  function createRequest(users: string[]) {
    const newData = users.map(() => {
      console.log(users);
    });
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [viewFriend, setViewFriend] = React.useState(false);
  const IsRichieste = richieste.length != 1;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/homepage" style={{ textDecoration: "none" }}>
          <span className="logo">HOME</span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <NavLink
            to="/profile"
            state={{ user: userSearch }}
            className="topbarLink"
            style={{ textDecoration: "none" }}
          >
            <Search className="searchIcon" onClick={() => {}} />
          </NavLink>

          <input
            placeholder="cerca i tuoi amici"
            className="searchInput"
            onChange={(event) => {
              setUserSearch(event.currentTarget.value);
            }}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <NavLink
            style={{ textDecoration: "none" }}
            to="/profile"
            state={{ user: user }}
            className="topbarLink"
          >
            <span className="nameUser" style={{ color: "white" }}>
              {user || "sconosciuto"}
            </span>
          </NavLink>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <div>
              <div>
                {/* onClick={handleClick} */}
                <Person />
              </div>
              <div>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  {/* {createRequest(richieste)} */}
                </Popover>
              </div>
              <span className="topbarIconBadge" onClick={() => {}}>
                {/* {IsRichieste ? "!" : "0"} */}
                {richieste.length}
              </span>
            </div>
          </div>

          <div className="topbarIconItem">
            <NavLink
              to="/home"
              style={{ textDecoration: "none" }}
              onClick={() => {
                localStorage.setItem("Loggato", "");
              }}
            >
              <LogoutIcon />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}