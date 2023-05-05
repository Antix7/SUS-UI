import {useEffect, useState} from 'react';
import './App.css';
import AdminPanel from "./components/panel/AdminPanel";
import LoginPanel from "./components/login/LoginPanel";
import axios from "axios";
import authHeader from "./authHeader";

export default function App() {

  const [username, setUsername] = useState(null);

  function handleLogin(username, token) {
    setUsername(username);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
  }
  function handleLogout() {
    setUsername(null);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
  }

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth`,
      null,
      {headers: authHeader()})
      .then((response) => {
        if(response.data.success) setUsername(sessionStorage.getItem("username"));
      });
  }, []);

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


