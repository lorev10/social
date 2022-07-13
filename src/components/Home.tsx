import React, { useContext } from "react";
import datas from "./Data";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import "./home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
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
import { useQuery } from "react-query";
import { ApiContext } from "./api";
import { createEmptyStorage, createInMemoryApi } from "./inMemomoryApi";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function getData() {
  return new Promise((resolve) =>
    // setTimeout(
    // () =>
    //   resolve([
    //     { id: 1, user: "Paolo" },
    //     { id: 2, user: "Francesco" },
    //     { id: 3, user: "Mattia" },
    //     { id: 4, user: "Luca" },
    //   ]),
    // 1000
    // )
    () => {
      console.log("inizio");
      const stored = localStorage.getItem("userAndPosts");
      const storage = stored ? JSON.parse(stored) : createEmptyStorage();
      const api = createInMemoryApi(storage);
      const getData = async () => {
        const data = await api.getUsers();
        return data;
      };
      return getData;
    }
  );

  // const { data: list } = useQuery(
  //   ["/api/datasource/v2/suggestion-category", { tenantId }],
  //   async ({ queryKey: [path, parameters] }) => {
  //     if (USE_MOCK) return mockSuggestionCategories;
  //     return (await client.getDatasourceSuggestionCategories()).filter(
  //       (suggestionCategory) => suggestionCategory.tenantId === tenantId,
  //     );
  //   },
  // );

  // {
  //   const stored = localStorage.getItem("userAndPosts");
  //   const storage = stored ? JSON.parse(stored) : createEmptyStorage();
  //   const api = createInMemoryApi(storage);
  //   const getData = async () => {
  //     const data = await api.getUsers();
  //     return data;
  //   };
  //   console.log(getData);
  // }
  // );
}

const Home = () => {
  const [dense, setDense] = React.useState(false);

  const [users, setUsers] = React.useState<string[]>(
    JSON.parse(localStorage.getItem("Registre") || "[]") || []
  );
  const [entry, setEntry] = React.useState(false);
  const [theme, setTheme] = React.useState("light-mode");
  // const { status, data, error } = useQuery("user", getData);

  // const stored = localStorage.getItem("userAndPosts");
  // const storage = stored ? JSON.parse(stored) : createEmptyStorage();

  // const localStorageApi = createLocalStorageApi("userAndPosts");
  // const test2 = inMemoryApi.getUsers();

  const stored = localStorage.getItem("userAndPosts");
  const storage = stored ? JSON.parse(stored) : createEmptyStorage();
  const api = createInMemoryApi(storage);

  const test2 = api.getUsers();
  console.log(test2);

  const cambiaTema = () => {
    if (theme === "light-mode") {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };

  const { status, data } = useQuery(["user"], async () => {
    return await api.getUsers();
  });

  console.log("cad" + JSON.stringify(data));

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem("Registre", JSON.stringify(users));
  }, [users]);
  console.log("pre error");

  function stampaNewUserd() {
    console.log("adz" + JSON.stringify(data));
    const newData = data?.map((data) => {
      return (
        <>
          {console.log(data.name)}
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

                  <ListItemText primary={data.name} />
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
              <ListItemText primary={data.nick} />
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
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>error</span>
      ) : (
        <>{stampaNewUserd()}</>
      )}

      <div className="grid-container">
        <Grid item xs={12} md={6}>
          {/* {stampaNewUserd()} */}
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        {newData}
      </div>
    </>
  );
};
function RecuperaDati() {
  const inMemoryApi = useContext(ApiContext);
  const usersQuery = useQuery(["user", {}], async () => inMemoryApi.getUsers());
}

export default Home;
