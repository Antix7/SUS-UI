import {useState} from "react";
import "./LoginPanel.css"
import axios from "axios";

export default function LoginPanel({ handleLogin }) {

  const [errorMessage, setErrorMessage] = useState("\u00A0");

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth`, formData, {withCredentials: false})
      .then((response) => {
        setErrorMessage(response.data.message);
        if(response.data.success) handleLogin(form.nick.value, response.data.token);
      })
      .catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem")
        console.log(error);
      });
  }

  return (
    <div id="loginPanel">
      <div id="loginBox">
        <p id="loginTitle">Logowanie do SUS</p>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input className="loginInput" name="nick" type="text" placeholder="Nazwa użytkownika"/>
          <input className="loginInput" name="pwd" type="password" placeholder="Hasło"/>
          <p id="errorMessage">{errorMessage}</p>
          <button type="submit" id="loginButton">Zaloguj</button>
        </form>
      </div>
    </div>
  )
}