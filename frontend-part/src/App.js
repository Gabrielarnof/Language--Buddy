import "./App.css";
import Home from "./components/home/home";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import Profile_created from "./components/profile_created/profile_created";
import People from "./components/people/people";
import Profile from "./components/profile/profile";
import EditProfile from "./components/editProfile/editProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile_created" element={<Profile_created />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </div>
  );
}

export default App;
