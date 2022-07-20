import "./topbar.css";
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
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { ApiContext } from "./api";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Topbar() {
  const user = localStorage.getItem("Loggato");
  const [userSearch, setUserSearch] = React.useState("");

  const api = useContext(ApiContext);

  const [richieste, SetRichieste] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("notification" + user) || "[]") || []
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [allFriend, setAllFriend] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("FriendOf" + user) || "[]") || []
  );
  React.useEffect(() => {
    localStorage.setItem("FriendOf" + user, JSON.stringify(allFriend));
  }, [allFriend]);

  function createRequest(users: string[]) {
    // return <Typography sx={{ p: 2 }}>{users}</Typography>;

    const newData = users.map((user: string) => {
      return (
        <Typography className="viewFriend" sx={{ p: 2 }}>
          <div className="NameRequest">
            <NavLink
              to="/profile"
              state={{ user: user }}
              className="topbarLink"
              style={{ textDecoration: "none" }}
            >
              {user}
            </NavLink>
          </div>
          <div>
            {" "}
            <button
              onClick={() => {
                setAllFriend([...allFriend, user]);
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
  const queryClient = new QueryClient();
  const [viewFriend, setViewFriend] = React.useState(false);
  const IsRichieste = richieste.length != 1;

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <NavLink to="/homepage" style={{ textDecoration: "none" }}>
            <div style={{ marginRight: "10px", color: "white" }}>HOME</div>
          </NavLink>

          <Search>
            {/* <SearchIconWrapper> */}
            <NavLink
              to="/profile"
              state={{ user: userSearch }}
              className="topbarLink"
              style={{ textDecoration: "none" }}
            >
              <div
                onClick={() => {
                  console.log("ciao");
                }}
              >
                <SearchIcon
                  style={{
                    color: "white",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    console.log("ciao");
                  }}
                />
              </div>
            </NavLink>
            {/* </SearchIconWrapper> */}

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setUserSearch(event.currentTarget.value);
              }}
            />
          </Search>

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
            <NavLink
              style={{ textDecoration: "none" }}
              to="/profile"
              state={{ user: user }}
              className="topbarLink"
            >
              <IconButton
                size="large"
                aria-label="home"
                aria-controls={mobileMenuId}
              >
                <HomeIcon style={{ color: "white" }} />
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
              <div
                onClick={(event) => {
                  handleClick(event);
                }}
              >
                <Person />
              </div>
              <div>
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
                    {createRequest(richieste)}
                  </Popover>
                </div>
                <span className="topbarIconBadge" onClick={() => {}}>
                  {/* {IsRichieste ? "!" : "0"} */}
                  {richieste.length}
                </span>
              </div>
            </IconButton>
            <NavLink
              to="/home"
              style={{ textDecoration: "none" }}
              onClick={() => {
                api.logout();
                // queryClient.invalidateQueries("currentUser");
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

    // <div className="topbarContainer">
    //   <div className="topbarLeft">
    //     <NavLink to="/homepage" style={{ textDecoration: "none" }}>
    //       <span className="logo">HOME</span>
    //     </NavLink>
    //   </div>
    //   <div className="topbarCenter">
    //     <div className="searchbar">
    //       <NavLink
    //         to="/profile"
    //         state={{ user: userSearch }}
    //         className="topbarLink"
    //         style={{ textDecoration: "none" }}
    //       >
    //         <Search onClick={() => {}} />
    //       </NavLink>

    //       <input
    //         placeholder="cerca i tuoi amici"
    //         className="searchInput"
    //         onChange={(event) => {
    //           setUserSearch(event.currentTarget.value);
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div className="topbarRight">
    //     <div className="topbarLinks">
    //       <NavLink
    //         style={{ textDecoration: "none" }}
    //         to="/profile"
    //         state={{ user: user }}
    //         className="topbarLink"
    //       >
    //         <span className="nameUser" style={{ color: "white" }}>
    //           {user || "sconosciuto"}
    //         </span>
    //       </NavLink>
    //     </div>
    //     <div className="topbarIcons">
    //       <div className="topbarIconItem">
    //         <div>
    //           <div
    //             onClick={(event) => {
    //               handleClick(event);
    //             }}
    //           >
    //             <Person />
    //           </div>
    //           <div>
    //             <Popover
    //               id={id}
    //               open={open}
    //               anchorEl={anchorEl}
    //               onClose={handleClose}
    //               anchorOrigin={{
    //                 vertical: "bottom",
    //                 horizontal: "left",
    //               }}
    //             >
    //               {createRequest(richieste)}
    //             </Popover>
    //           </div>
    //           <span className="topbarIconBadge" onClick={() => {}}>
    //             {/* {IsRichieste ? "!" : "0"} */}
    //             {richieste.length}
    //           </span>
    //         </div>
    //       </div>

    //       <div className="topbarIconItem">
    //         <NavLink
    //           to="/home"
    //           style={{ textDecoration: "none" }}
    //           onClick={() => {
    //             localStorage.setItem("Loggato", "");
    //           }}
    //         >
    //           <LogoutIcon />
    //         </NavLink>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
