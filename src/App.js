import { useState } from 'react';
import './App.css';
import AdminPanel from "./components/panel/AdminPanel";
import LoginPanel from "./components/login/LoginPanel";
import axios from "axios";

export default function App() {

  const [username, setUsername] = useState(null);

  function handleLogout() {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/wyloguj`)
      .catch((error) => {
        console.log(error);
      });
    setUsername(null);
  }

  function handleLogin(username, token) {
    setUsername(username);
    localStorage.setItem("token", token);
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


