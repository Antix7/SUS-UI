import { useState } from 'react';
import './App.css';
import AdminPanel from "./components/panel/AdminPanel";
import LoginPanel from "./components/login/LoginPanel";
import axios from "axios";

export default function App() {

  const [username, setUsername] = useState(null);

  function handleLogin(username, token) {
    setUsername(username);
    sessionStorage.setItem("token", token);
  }
  function handleLogout() {
    setUsername(null);
    sessionStorage.removeItem("token");
  }

  return (
    <>
      {username ?
        <AdminPanel
          username={`${username}@${process.env.REACT_APP_ORGANISATION_NAME}`}
          handleLogout={handleLogout}
        />
        :
        <LoginPanel
          handleLogin={handleLogin}
        />
      }
    </>
  )
}


