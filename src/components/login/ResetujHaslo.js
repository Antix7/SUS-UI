import {useEffect, useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import authHeeader from "../../authHeader";
import {useNavigate} from "react-router-dom";

function ResetForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/resetuj_haslo`,
        formData,
        {headers: authHeeader()} // passing JWT
    )
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
        .catch((err) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
          console.log(err);
        });
  }

  return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
            className="textInput loginInput"
            name="password1"
            type="password"
            placeholder="Nowe hasło"/>
        <input
            className="textInput loginInput"
            name="password2"
            type="password"
            placeholder="Powtórz nowe hasło"/>

        <p className="loginErrorMessage">{errorMessage}</p>
        <p className="loginSuccessMessage">{successMessage}</p>
        <button type="submit" className="loginButtonBig">Resetuj hasło</button>
      </form>
  )
}

function SendResetCodeForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/send_reset_code`, formData)
        .then((response) => {
          if(response.data.success) {
            setSuccessMessage(response.data.message);
            setErrorMessage(null);
          }
          else {
            setErrorMessage(response.data.error);
            setSuccessMessage(null);
          }
        })
        .catch((err) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
          console.log(err);
        });
  }

  return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
            className="textInput loginInput"
            name="username"
            type="text"
            placeholder="Nazwa użytkownika"/>
        <p className="loginErrorMessage sendResetCodeMessage">{errorMessage}</p>
        <p className="loginSuccessMessage sendResetCodeMessage">{successMessage}</p>
        <button type="submit" className="loginButtonSmall" id="sendCodeButton">Wyślij kod na email</button>
      </form>
  )
}

function CheckResetCodeForm({setCurrentForms, handleResetLogin}) {
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // formData.forEach((x, y) => console.log(x, y));

    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/check_reset_code`, formData)
        .then((response) => {
          if(response.data.success) {
            setCurrentForms(<ResetForm />);
            handleResetLogin(form.username.value, response.data.token);
          }
          else setErrorMessage(response.data.message);
        })
        .catch((err) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
          console.log(err);
        });
  }

  // TODO wykorzystanie nazwy użytkownika z drugiego forma
  return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
            className="textInput loginInput"
            name="username"
            type="text"
            placeholder="Nazwa użytkownika"/>
        <input
            className="textInput loginInput"
            name="code"
            type="text"
            placeholder="Kod otrzymany mailem"/>

        <p className="loginErrorMessage">{errorMessage}</p>
        <button type="submit" className="loginButtonBig">Resetuj hasło</button>
      </form>
  );
}


export default function ResetujHaslo({handleResetLogin}) {
  const navigate = useNavigate();

  const [currentForms, setCurrentForms] = useState(null);
  useEffect(() => {setCurrentForms(
      <>
        <SendResetCodeForm />
        <CheckResetCodeForm setCurrentForms={setCurrentForms} handleResetLogin={handleResetLogin}/>
      </>
  )}, []);

  function handleGoBack(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
      <div id="loginPanel">
        <div id="loginBox">
          <p id="loginTitle">Resetowanie hasła</p>
          {currentForms}
          <button className="loginButtonSmall" onClick={handleGoBack}>Wróć</button>
        </div>
      </div>
  )
}