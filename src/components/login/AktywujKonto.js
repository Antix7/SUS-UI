import {useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import {useNavigate} from "react-router-dom";


export default function AktywujKonto({ handleLogin }) {
  const navigate = useNavigate();

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

  function handleGoBack(e) {
    e.preventDefault();

    navigate('/');
  }

  return (
      <div id="loginPanel">
        <div id="loginBox">
          <p id="loginTitle">Aktywacja konta w SUS</p>
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
              <button type="submit" id="activateButton">Aktywuj</button>
            </form>
          <button className="goBackButton" onClick={handleGoBack}>Wróć</button>
        </div>
      </div>
  )
}