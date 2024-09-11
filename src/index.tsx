import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowseCourses } from "./Pages/BrowseCourses/BrowseCourses";
import { Profile } from "./Pages/Profile/Profile";
import { Posts } from "./Pages/Posts/Posts";
import { AddScore } from "./Pages/AddScore/AddScore";
import AddGolfCourse from "./AddGolfCourse";
import LoginForm from "./Pages/Login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<BrowseCourses />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/scores" element={<AddScore />} />
      <Route path="/add" element={<AddGolfCourse />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  </Router>
);
