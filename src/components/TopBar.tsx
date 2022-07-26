import React, { useContext } from "react";
import Person from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { ApiContext } from "./api";
import { useQuery, useQueryClient } from "react-query";

export default function Topbar() {
  const [userSearch, setUserSearch] = React.useState("");
  const api = useContext(ApiContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openNotificy, setOpenNotificy] = React.useState(false);

  const { status: statusUserConnesso, data: utenteConnesso } = useQuery(
    ["currentUserTopBar"],
    async () => {
      return await api.getCurrentUser();
    }
  );
  const user = utenteConnesso || "";

  const { status: statusRequestFriend, data: requestFriends } = useQuery(
    ["requestFriends"],
    async () => {
      return await api.getFriendRequest(user);
    },
    {
      enabled: !!user,
    }
  );

  function createRequest(userFriends: string[]) {
    const newData = userFriends.map((userFriend: string) => {
      return (
        <Typography sx={{ p: 2 }}>
          <div>
            {/* <NavLink
              to="/profile"
              state={{ user: userFriend }}
              className="topbarLink"
              style={{ textDecoration: "none" }}
            > */}
            {userFriend}
            {/* </NavLink> */}
          </div>
          <div>
            {" "}
            <button
              onClick={() => {
                api.addFriend(user, userFriend);
                api.addFriend(userFriend, user);

                api.removeRequest(user, userFriend);
                queryClient.invalidateQueries(["requestFriends"]);
                queryClient.invalidateQueries(["nameFriends"]);

                //bisogna invalidare anche la query dei post degli amici
              }}
            >
              Aggiungi
            </button>
          </div>
        </Typography>
      );
    });
    return newData;
  }
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // const queryClient = new QueryClient();
  const queryClient = useQueryClient();
  const [anchorElNavBar, setAnchorElNavBar] =
    React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavBar(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      {statusRequestFriend === "loading" || statusUserConnesso === "loading" ? (
        <span> </span>
      ) : statusRequestFriend === "error" || statusUserConnesso === "error" ? (
        <span>error</span>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ width: "100%" }}>
              <Toolbar>
                <div className="topbarCenter" style={{ flex: "5" }}>
                  <div
                    className="searchbar"
                    style={{
                      width: "100%",
                      height: "30px",
                      backgroundColor: "white",
                      display: "flex",
                      borderRadius: "30px",
                      alignItems: "center",
                    }}
                  >
                    <NavLink
                      to="/profile"
                      state={{ user: user, profiloVisitato: userSearch }}
                      className="topbarLink"
                      style={{ textDecoration: "none" }}
                    >
                      <SearchIcon className="searchIcon" onClick={() => {}} />
                    </NavLink>

                    <input
                      placeholder="cerca i tuoi amici"
                      className="searchInput"
                      style={{ border: "none", width: "70%" }}
                      onChange={(event) => {
                        setUserSearch(event.currentTarget.value);
                      }}
                    />
                  </div>
                </div>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="home"
                    aria-controls={mobileMenuId}
                  >
                    <NavLink to="/homepage" style={{ textDecoration: "none" }}>
                      <HomeIcon style={{ color: "white" }} />
                    </NavLink>
                  </IconButton>

                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/profile"
                    state={{ user: user }}
                  >
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <Person style={{ color: "white" }} />
                    </IconButton>
                  </NavLink>

                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <Badge badgeContent={requestFriends.length} color="error">
                      <div
                        onClick={(event) => {
                          handleClick(event);
                          setOpenNotificy(!openNotificy);
                        }}
                      >
                        <NotificationsIcon />
                        <Popover
                          id={id}
                          open={openNotificy}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          {createRequest(requestFriends)}
                        </Popover>
                      </div>
                    </Badge>
                  </IconButton>

                  <NavLink
                    to="/home"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      api.logout();
                      queryClient.invalidateQueries();
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <LogoutIcon style={{ color: "white" }} />
                    </IconButton>
                  </NavLink>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      )}
    </>
  );
}
