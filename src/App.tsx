import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Helmet } from "react-helmet";
import Login from "./components/Login";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
export default function App() {
  const user = localStorage.getItem("Loggato");
  const sizemobile = 500;
  const [size, setSize] = React.useState(window.innerWidth);

  return (
    <div className="App">
      <Router>
        <nav className="d-flex flex-row justify-content-center mx-auto gap-2 mb-4"></nav>
        <Helmet>
          <title>social</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}
