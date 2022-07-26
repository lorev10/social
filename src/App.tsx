import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import { ApiContext } from "./components/api";
import {
  createEmptyStorage,
  createInMemoryApi,
} from "./components/inMemomoryApi";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createLocalStorageApi } from "./components/LocalStorageApi";
import { Comments } from "./components/Comments";

//come stava
const api = createInMemoryApi(createEmptyStorage());
const localStorageApi = createLocalStorageApi("0");
const queryClient = new QueryClient();
// const stored = localStorage.getItem("userAndPosts");
// const storage = stored ? JSON.parse(stored) : createEmptyStorage();
// const api = createInMemoryApi(storage);

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
  return (
    <ApiContext.Provider value={api}>
      <GlobalStyleBody />
      <GlobalStyleApp />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ApiContext.Provider>
  );
}
