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
import { createLocalStorageApi } from "./components/LocalStorageApi";

//come stava
// const inMemoryApi = createInMemoryApi(createEmptyStorage());
// const localStorageApi = createLocalStorageApi("0");

const stored = localStorage.getItem("userAndPosts");
const storage = stored ? JSON.parse(stored) : createEmptyStorage();
const api = createInMemoryApi(storage);

export default function App() {
  const user = localStorage.getItem("Loggato");
  const sizemobile = 500;
  const [size, setSize] = React.useState(window.innerWidth);
  return (
    <ApiContext.Provider value={api}>
      <div className="App">
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
