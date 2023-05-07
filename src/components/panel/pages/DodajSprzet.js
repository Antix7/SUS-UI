import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import Accordion from "../../Accordion";
import LoadingIcon from "../../LoadingIcon";

function DropdownAccordion({ children, title, selected, data, fieldText }) {
  return (<>
    <label className="formLabel disableSelect">{title}</label>
    <Accordion
      triggerContent={<p className="dropdownAccordionField disableSelect">{data[selected] ? data[selected] : fieldText ? fieldText : "Opcje"}</p>}
      altTrigger={selected}
      panelClass="dropdownAccordionPanel"
    >
      {children}
    </Accordion>
  </>)
}

function DropdownOptions({ data, handleFormChange, name, selected }) {
  return(
    Object.entries(data).map(([id, nazwa])=> <div key={id} className="disappear">
        {/* these elements need to be wrapped in a disappearing div with key because React doesn't like mapping to multiple components */}
        <input
          className="radioInput"
          type="radio"
          name={name}
          value={id}
          id={name+id} key={name+id}
          onChange={handleFormChange}
          checked={id === selected}
        />
        <label htmlFor={name+id} className="radioLabel disableSelect">
          {nazwa}
        </label><br/>
      </div>)
  )
}

function DropdownAccordionWithOptions({ title, selected, data, fieldText, handleFormChange, name }) {
  // this might be confusing, but it's just another wrapper component to simplify code in SprzetForm
  return (
    <DropdownAccordion
      title={title}
      selected={selected}
      data={data}
      fieldText={fieldText}
    >
      <DropdownOptions
        name={name}
        data={data}
        handleFormChange={handleFormChange}
        selected={selected}
      />
    </DropdownAccordion>
  )
}


function SprzetForm({ data }) {

  const [formdata, setFormdata] = useState({
    status: 0,
    kategoria: 0,
    stan: 0,
    lokalizacja: 0,
    wlasciciel: 0,
    uzytkownik: 0
  });

  function handleFormChange(e) {
    const nextFormdata = Object.assign({}, formdata);
    nextFormdata[e.target.name] = e.target.value;
    setFormdata(nextFormdata);
  }

  useEffect(() => {
    const nextFormdata = Object.assign({}, formdata);
    nextFormdata.stan = 0;
    setFormdata(nextFormdata);
  }, [formdata.kategoria]);

  return(<>
    <form>

      <label htmlFor="nazwa" className="formLabel disableSelect">Nazwa</label>
      <input
        className="textInput withLabel"
        name="nazwa" id="nazwa"
        type="text"
      />

      <label htmlFor="ilosc" className="formLabel disableSelect">Ilość</label>
      <input
        className="textInput withLabel"
        name="ilosc" id="ilosc"
        type="number"
        defaultValue={1}
      />

      <DropdownAccordionWithOptions
        title="Status" name="status"
        data={data["statusy"]}
        selected={formdata.status}
        handleFormChange={handleFormChange}
      />

      <DropdownAccordionWithOptions
        title="Kategoria" name="kategoria"
        data={data["kategorie"]}
        selected={formdata.kategoria}
        handleFormChange={handleFormChange}
      />

      <DropdownAccordionWithOptions
        title="Stan" name="stan"
        data={formdata.kategoria ? data["stany"][formdata.kategoria] : {}}
        selected={formdata.stan}
        handleFormChange={handleFormChange}
        fieldText={formdata.kategoria ? "" : "Najpierw wybierz kategorię"}
      />

      <DropdownAccordionWithOptions
        title="Lokalizacja" name="lokalizacja"
        data={data["lokalizacje"]}
        selected={formdata.lokalizacja}
        handleFormChange={handleFormChange}
      />

      <DropdownAccordionWithOptions
        title="Właściciel" name="wlasciciel"
        data={data["podmioty"]}
        selected={formdata.wlasciciel}
        handleFormChange={handleFormChange}
      />

      <DropdownAccordionWithOptions
        title="Użytkownik" name="uzytkownik"
        data={data["podmioty"]}
        selected={formdata.uzytkownik}
        handleFormChange={handleFormChange}
      />

      <label htmlFor="opisInput" className="formLabel disableSelect">Opis</label>
      <textarea
        className="textareaInput textInput"
        name="opis" id="opisInput"
        placeholder="(opcjonalne)"
        rows="5"
      />

      <label htmlFor="zdjecieInput" className="formLabel disableSelect">Zdjęcie</label>
      <input
        className="textInput"
        type="file" accept="image/*"
        name="zdjecie" id="zdjecieInput"
      />




    </form>
  </>)
}

export default function DodajSprzet() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dodaj/dropdowns`,
      {headers: authHeader()}
    )
      .then((response) => {
        if(response.data.success) setData(response.data.data);
        else setErrorMessage(response.data.message);
      })
      .catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
        console.log(error);
      });
  }, []);

  return (<div className="contentDiv longForm">
    <p className="contentTitle">Dodawanie sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    {data && !errorMessage ?
      <SprzetForm data={data}/>
      :
      <LoadingIcon/>
    }

  </div>)
}