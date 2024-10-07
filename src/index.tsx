import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowseCourses } from "./Pages/BrowseCourses/BrowseCourses";
import { Profile } from "./Pages/Profile/Profile";
import { Posts } from "./Pages/Posts/Posts";
import { AddScore } from "./Pages/AddScore/AddScore";
import AddGolfCourse from "./AddGolfCourse";
import Login from "./Pages/Login/Login";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<BrowseCourses />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/scores" element={<AddScore />} />
        <Route path="/add" element={<AddGolfCourse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </UserProvider>
);
