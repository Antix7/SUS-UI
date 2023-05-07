import {useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import {useNavigate} from "react-router-dom";


export default function AktywujKonto() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleActivateSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if(form.password1.value !== form.password2.value) {
      setErrorMessage("Hasła się nie zgadzają");
      return;
    }

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/aktywuj`, formData)
        .then((response) => {
          if(response.data.success) {
            setSuccessMessage(response.data.message);
            setErrorMessage(null);
          }
          else {
            setErrorMessage(response.data.message);
            setSuccessMessage(null);
          }
        })
        .catch((error) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem")
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

              <p id="activateErrorMessage">{errorMessage}</p>
              <p id="activateSuccessMessage">{successMessage}</p>
              <button type="submit" id="activateButton">Aktywuj</button>
            </form>
          <button className="goBackButton" onClick={handleGoBack}>Wróć</button>
        </div>
      </div>
  )
}