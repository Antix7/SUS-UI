import {useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import MessageBox from "../../MessageBox";

export default function ZmienHaslo({ handleLogout }) {

  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if(form.password_new1.value !== form.password_new2.value) {
      setMessage({
        text: "Hasła nie są takie same",
        type: "error",
      });
      return;
    }
    if(form.password_old.value === form.password_new1.value) {
      setMessage({
        text: "Nowe hasło musi być inne od poprzedniego",
        type: "error",
      });
      return;
    }

    const formData = new FormData(form);

    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/zmien_haslo`,
      formData,
      {headers: authHeader()} // passing JWT
    )
      .then((response) => {
        if(response.data.success) {
          setMessage({
            text: "Hasło zostało zmienione pomyślnie",
            type: "success",
          });
          // TODO handle logging out after password reset
        }
        else setMessage({
          text: response.data.message,
          type: "error",
        });
      }).catch((error) => {
        setMessage({
          text: "Wystąpił błąd w komunikacji z serwerem",
          type: "error",
        });
      });
  }

  return (
    <div className="contentDiv">
    <p className="contentTitle">Zmiana hasła</p>
    <form
      className="centeredForm"
      id="passwordChangeForm"
      onSubmit={handleSubmit}
    >
      <input
        className="textInput"
        name="password_old"
        type="password"
        placeholder="Stare hasło"/>
      <input
        className="textInput"
        name="password_new1"
        type="password"
        placeholder="Nowe hasło"/>
      <input
        className="textInput"
        name="password_new2"
        type="password"
        placeholder="Powtórz nowe hasło"/>

      <button className="button" type="submit" id="submitButton">Zmień hasło</button>
    </form>
    <MessageBox message={message}/>
  </div>
  )
}