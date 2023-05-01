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

  return (
    <>
      {username ?
        <AdminPanel
          username={username+"@burza"}
          handleLogout={handleLogout}
        />
        :
        <LoginPanel
          handleLogin={setUsername}
        />
      }
    </>
  )
}


