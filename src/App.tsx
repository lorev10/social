import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import HomePage from "./screens/HomePage";
import { ApiContext } from "./components/api";
import {
  createEmptyStorage,
  createInMemoryApi,
} from "./components/inMemomoryApi";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { createLocalStorageApi } from "./components/LocalStorageApi";
import { Comments } from "./screens/Comments";

const api = createInMemoryApi(createEmptyStorage());
const localStorageApi = createLocalStorageApi("3");
const queryClient = new QueryClient();

const GlobalStyleBody = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
    background: #EFEFEF;
    
  }`;

const GlobalStyleApp = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }`;

export default function App() {
  return (
    <ApiContext.Provider value={api}>
      <ApiContext.Provider value={localStorageApi}>
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
    </ApiContext.Provider>
  );
}
