import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import Accordion from "../../Accordion";
import LoadingIcon from "../../LoadingIcon";

function DropdownAccordion({ children, title, selected, data }) {

  return (<>
    <label className="formLabel disableSelect">{title}</label>
    <Accordion
      triggerContent={<p className="dropdownAccordionField disableSelect">{data[selected] ? data[selected] : "Opcje"}</p>}
      altTrigger={selected}
      panelClass="dropdownAccordionPanel"
    >
      {children}
    </Accordion>
  </>)
}

function DropdownOptions({ data, handleFormChange, name }) {
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
        />
        <label htmlFor={name+id} className="radioLabel disableSelect">
          {nazwa}
        </label><br/>
      </div>)
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

      <DropdownAccordion
        title="Status"
        selected={formdata.status}
        data={data["statusy"]}
      >
        <DropdownOptions
          name="status"
          data={data["statusy"]}
          handleFormChange={handleFormChange}
        />
      </DropdownAccordion>


      <DropdownAccordion
        title="Kategoria"
        selected={formdata.kategoria}
        data={data["kategorie"]}
      >
        <DropdownOptions
          name="kategoria"
          data={data["kategorie"]}
          handleFormChange={handleFormChange}
        />
      </DropdownAccordion>

      {/*TODO stany*/}
      {/*<DropdownAccordion*/}
      {/*  title="Stan"*/}
      {/*  selected={formdata.stan}*/}
      {/*  data={data["stany"]}*/}
      {/*>*/}
      {/*  <DropdownOptions*/}
      {/*    name="stan"*/}
      {/*    data={data["stany"]}*/}
      {/*    handleFormChange={handleFormChange}*/}
      {/*  />*/}
      {/*</DropdownAccordion>*/}


      <DropdownAccordion
        title="Lokalizacja"
        selected={formdata.lokalizacja}
        data={data["lokalizacje"]}
      >
        <DropdownOptions
          name="lokalizacja"
          data={data["lokalizacje"]}
          handleFormChange={handleFormChange}
        />
      </DropdownAccordion>


      <DropdownAccordion
        title="Właściciel"
        selected={formdata.wlasciciel}
        data={data["podmioty"]}
      >
        <DropdownOptions
          name="wlasciciel"
          data={data["podmioty"]}
          handleFormChange={handleFormChange}
        />
      </DropdownAccordion>


      <DropdownAccordion
        title="Użytkownik"
        selected={formdata.uzytkownik}
        data={data["podmioty"]}
      >
        <DropdownOptions
          name="uzytkownik"
          data={data["podmioty"]}
          handleFormChange={handleFormChange}
        />
      </DropdownAccordion>

      <label htmlFor="opisInput" className="formLabel disableSelect">Opis</label>
      <textarea
        className="textareaInput textInput"
        name="opis" id="opisInput"
        placeholder="(opcjonalne)"
        rows="5"
      ></textarea>




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