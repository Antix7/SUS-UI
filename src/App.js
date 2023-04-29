import { useState } from 'react';
import './App.css';
import AdminPanel from "./components/panel/AdminPanel";
import LoginPanel from "./components/login/LoginPanel";

export default function App() {

  const [username, setUsername] = useState(null);

  function handleUsernameChange(user_name) {
    setUsername(user_name)
  }

  return (
    <>
      {username ? <AdminPanel username={username+"@burza"} handleLogout={()=>handleUsernameChange(null)}/> : <LoginPanel handleLogin={handleUsernameChange}/>}
    </>
  )
}


