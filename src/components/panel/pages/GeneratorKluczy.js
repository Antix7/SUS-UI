import {useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"

export default function GeneratorKluczy() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [key, setKey] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setKey(null);

    const form = e.target;
    const formData = new FormData(form);

    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/generuj_klucz`,
      formData,
      {headers: authHeader()} // passing JWT
    )
      .then((response) => {
        if(!response.data.success)
          setErrorMessage(response.data.message);
        else
          setKey(response.data.klucz);
      }).catch((error) => {
      setErrorMessage("Wystąpił błąd w komunikacji z serwerem")
      console.log(error);
    });
  }

  return (<div className="contentDiv">
    <p className="contentTitle">Generator kluczy</p>
    <form
      className="centeredForm"
      id="generateKeyForm"
      onSubmit={handleSubmit}
    >
      <div className="inputGroup">
        <input
          name="czy_admin"
          type="checkbox"/>
        <label htmlFor="czy_admin">Uprawnienia administratora</label>
      </div>

      <div className="inputGroup">
        <label htmlFor="data">Data wygaśnięcia</label>
        <input
          className="textInput"
          id="dateInput"
          name="data"
          type="date"/>
      </div>
      <p>Zostaw puste, aby konto nie wygasło</p>

      <button className="button" type="submit" id="submitButton">Generuj klucz</button>
    </form>
    <p id="errorMessage">{errorMessage}</p>
    <p id="generatedKey">{key}</p>
  </div>)
}