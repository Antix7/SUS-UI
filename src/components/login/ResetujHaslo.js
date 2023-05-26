import {useEffect, useState} from "react";
import axios from "axios";
import "./LoginPanel.css";
import "../css/input.css";
import authHeeader from "../../authHeader";
import {useNavigate} from "react-router-dom";
import MessageBox from "../MessageBox";

function ResetForm() {
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    if(form.password1.value !== form.password2.value) {
      setMessage({
        text: "Hasła nie są takie same",
        type: "error",
      });
      return;
    }

    axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/resetuj_haslo`,
        formData,
        {headers: authHeeader()} // passing JWT
    )
        .then((response) => {
          if(response.data.success) {
            setMessage({
              text: response.data.message,
              type: "success",
            });
          }
          else {
            setMessage({
              text: response.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          setMessage({
            text: "Wystąpił błąd w komunikacji z serwerem",
            type: "error",
          });
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

        <MessageBox message={message}/>
        <button type="submit" className="loginButtonBig">Resetuj hasło</button>
      </form>
  )
}

function SendResetCodeForm({formUsername, setFormUsername}) {
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/send_reset_code`, formData)
        .then((response) => {
          if(response.data.success) {
            setMessage({
              text: response.data.message,
              type: "success",
            });
          }
          else {
            setMessage({
              text: response.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          setMessage({
            text: "Wystąpił błąd w komunikacji z serwerem",
            type: "error",
          });
        });
  }

  return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
            className="textInput loginInput"
            name="username"
            type="text"
            placeholder="Nazwa użytkownika"
            value={formUsername}
            onChange={(e) => {
              setFormUsername(e.target.value);
            }}
        />
        <MessageBox message={message}/>
        <button type="submit" className="loginButtonSmall" id="sendCodeButton">Wyślij kod na email</button>
      </form>
  )
}

function CheckResetCodeForm({setCurrentForms, handleResetLogin, formUsername}) {
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append('username', formUsername);

    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/check_reset_code`, formData)
        .then((response) => {
          if(response.data.success) {
            setCurrentForms(<ResetForm />);
            handleResetLogin(formUsername, response.data.token);
          }
          else setMessage({
            text: response.data.message,
            type: "error",
          });;
        })
        .catch((err) => {
          setMessage({
            text: "Wystąpił błąd w komunikacji z serwerem",
            type: "error",
          });
        });
  }

  return (
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
            className="textInput loginInput"
            name="code"
            type="text"
            placeholder="Kod otrzymany mailem"/>

        <MessageBox message={message}/>
        <button type="submit" className="loginButtonBig">Resetuj hasło</button>
      </form>
  );
}


export default function ResetujHaslo({handleResetLogin}) {
  const navigate = useNavigate();

  const [currentForms, setCurrentForms] = useState(null);
  const [formUsername, setFormUsername] = useState('');
  useEffect(() => {setCurrentForms(
      <>
        <SendResetCodeForm formUsername={formUsername} setFormUsername={setFormUsername}/>
        <CheckResetCodeForm setCurrentForms={setCurrentForms} handleResetLogin={handleResetLogin} formUsername={formUsername}/>
      </>
  )}, [formUsername]);

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