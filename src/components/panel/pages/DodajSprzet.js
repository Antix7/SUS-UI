import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import Accordion from "../../Accordion";

function DropdownAccordion({ name }) {


}


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
      <Accordion
        triggerContent={<button className="button" type="button">Kliknij mnie</button>}
      >
        <input type="radio" name="q" value="1" id="1"/><label htmlFor="1">opcja 1</label>
        <input type="radio" name="q" value="2" id="2"/><label htmlFor="2">opcja 2</label>
        <input type="radio" name="q" value="3" id="3"/><label htmlFor="3">opcja 3</label>
      </Accordion>

    </form>

  </div>)
}