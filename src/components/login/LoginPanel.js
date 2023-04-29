import {useState} from "react";
import "./LoginPanel.css"

export default function LoginPanel({ handleLogin }) {

  return (
    <div id="loginPanel">
      <div id="loginBox">
        <p id="loginTitle">Logowanie do SUS</p>
        <input className="loginInput" type="text" placeholder="Nazwa użytkownika"/><br/>
        <input className="loginInput" type="password" placeholder="Hasło"/><br/>
        <button id="loginButton" onClick={()=>handleLogin("admin")}>Zaloguj</button>
      </div>
    </div>
  )
}