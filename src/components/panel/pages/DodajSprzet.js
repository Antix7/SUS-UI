import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"

export default function DodajSprzet() {

  const [errorMessage, setErrorMessage] = useState(null);

  return (<div className="contentDiv">
    <p className="contentTitle">Dodawanie sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    <form>
      <label htmlFor="nazwa" className="formLabel">Nazwa</label>
      <input
        className="textInput withLabel"
        name="nazwa" id="nazwa"
        type="text"
      />
      <label htmlFor="ilosc" className="formLabel">Ilość</label>
      <input
        className="textInput withLabel"
        name="ilosc" id="ilosc"
        type="number"
      />
      <select name="status_id" className="textInput">
        <option value="" selected={true} disabled={true} hidden={true}>Status</option>
        <option value="1">Dostępny</option>
        <option value="2">Niedostępny</option>
        <option value="3">Zgubiony💀</option>
      </select>

    </form>

  </div>)
}