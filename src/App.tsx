import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Helmet } from "react-helmet";
import Login from "./components/Login";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import { ApiContext } from "./components/api";
import {
  createEmptyStorage,
  createInMemoryApi,
} from "./components/inMemomoryApi";
import style from "styled-components";
import { createGlobalStyle } from "styled-components";

import { createLocalStorageApi } from "./components/LocalStorageApi";

//come stava
// const inMemoryApi = createInMemoryApi(createEmptyStorage());
// const localStorageApi = createLocalStorageApi("0");

const stored = localStorage.getItem("userAndPosts");
const storage = stored ? JSON.parse(stored) : createEmptyStorage();
const api = createInMemoryApi(storage);

const GlobalStyleBody = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
    background: #9575cd;
    color: #ffffff;
  }`;

const GlobalStyleApp = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }`;

export default function App() {
  const user = localStorage.getItem("Loggato");
  const sizemobile = 500;
  const [size, setSize] = React.useState(window.innerWidth);
  return (
    <ApiContext.Provider value={api}>
      <div className="App">
        <GlobalStyleBody />
        <GlobalStyleApp />
        <Router>
          <Helmet>
            <title>social</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </ApiContext.Provider>
  );
}
