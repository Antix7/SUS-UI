import {useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import Accordion from "../Accordion";


export default function LoginPanel({ handleLogin }) {

  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // handleLogin(form.username.value, ""); // for mobile testing with GitHub Pages

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth`, formData)
      .then((response) => {
        if(response.data.success) handleLogin(form.username.value, response.data.token);
        else setErrorMessage(response.data.message);
      })
      .catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem")
        console.log(error);
      });
  }

  const [activateErrorMessage, setActivateErrorMessage] = useState(null);
  const [activateSuccessMessage, setActivateSuccessMessage] = useState(null);

  function handleActivateSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/aktywuj`, formData)
        .then((response) => {
          if(response.data.success) {
            setActivateSuccessMessage(response.data.message);
            setActivateErrorMessage(null);
          }
          else {
            setActivateErrorMessage(response.data.message);
            setActivateSuccessMessage(null);
          }
        })
        .catch((error) => {
          setActivateErrorMessage("Wystąpił błąd w komunikacji z serwerem")
          console.log(error);
        });
  }

  return (
    <div id="loginPanel">
      <div id="loginBox">
        <p id="loginTitle">Logowanie do&nbsp;SUS</p>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input
            className="textInput loginInput"
            name="username"
            type="text"
            placeholder="Nazwa użytkownika"/>
          <input
            className="textInput loginInput"
            name="password"
            type="password"
            placeholder="Hasło"/>

          <p id="loginErrorMessage">{errorMessage}</p>
          <button type="submit" id="loginButton">Zaloguj</button>
        </form>

        <Accordion triggerContent={<button id="toggleActivate">Aktywuj konto</button>}>
          <form id="activateForm" onSubmit={handleActivateSubmit}>
            <input
                className="textInput activateInput"
                name="key"
                type="text"
                placeholder="Kod do aktywacji"/>
            <input
                className="textInput activateInput"
                name="username"
                type="text"
                placeholder="Nazwa użytkownika"/>
            <input
                className="textInput activateInput"
                name="email"
                type="email"
                placeholder="Adres email"/>
            <input
                className="textInput activateInput"
                name="password1"
                type="password"
                placeholder="Hasło"/>
            <input
                className="textInput activateInput"
                name="password2"
                type="password"
                placeholder="Powtórz hasło"/>

            <p id="activateErrorMessage">{activateErrorMessage}</p>
            <p id="activateSuccessMessage">{activateSuccessMessage}</p>
            <button type="submit" id="activateButton">Zaloguj</button>
          </form>
        </Accordion>
    </div>
  </div>
  )
}