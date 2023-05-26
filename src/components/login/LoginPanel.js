import {useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import {useNavigate} from "react-router-dom";
import MessageBox from "../MessageBox";


export default function LoginPanel({ handleLogin }) {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // handleLogin(form.username.value, ""); // for mobile testing with GitHub Pages

    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth`, formData)
      .then((response) => {
        if(response.data.success) handleLogin(
          form.username.value,
          response.data.token,
          response.data.isAdmin);
        else setMessage({
          text: response.data.message,
          type: "error",
        });
      })
      .catch((error) => {
        setMessage({
          text: "Wystąpił błąd w komunikacji z serwerem",
          type: "error",
        });
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

          <button type="submit" className="loginButtonBig">Zaloguj</button>
          <MessageBox message={message}/>
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