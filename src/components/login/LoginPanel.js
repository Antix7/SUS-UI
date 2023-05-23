import {useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import {useNavigate} from "react-router-dom";


export default function LoginPanel({ handleLogin }) {
  const navigate = useNavigate();

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

  function handleActivateClick(e) {
    e.preventDefault();
    navigate("/aktywuj_konto");
  }

  function handleResetClick(e) {
    e.preventDefault();
    navigate("/resetuj_haslo");
  }

  return (
    <div id="loginPanel">
      <div id="loginBox">
        <p id="loginTitle">Logowanie do&nbsp;SUS</p>
        <form className="loginForm" onSubmit={handleSubmit}>
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

          <p className="loginErrorMessage">{errorMessage}</p>
          <button type="submit" className="loginButtonBig">Zaloguj</button>
        </form>
        <p className="pInfo">Zapomniałeś hasła?&nbsp;
          <p className="pLink" onClick={handleResetClick}>Beka z ciebie</p>
        </p>
        <p className="pInfo">Masz kod do aktywacji?&nbsp;
          <p className="pLink" onClick={handleActivateClick}>Aktywuj konto</p>
        </p>
    </div>
  </div>
  )
}