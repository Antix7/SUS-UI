import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import SprzetTable from "./tables/SprzetTable";
import LoadingIcon from "../../LoadingIcon";
import Accordion from "../../Accordion";


function CheckboxAccordion({ title, name, data, onChange }) {
  return (
    <Accordion
      triggerContent={<p className="dropdownAccordionField disableSelect">{title}</p>}
      panelClass="dropdownAccordionPanel"
    >
      <form id={name+"_filter_form"}>
        {Object.entries(data).map(([id, nazwa]) => <div key={id} className="disappear">
          <input
            className="checkboxInput"
            type="checkbox"
            name={name+"_"+id}
            id={name+id} key={name+id}
            onChange={onChange}
          />
          <label htmlFor={name+id} className="radioLabel disableSelect">
            {nazwa}
          </label><br/>
        </div>)}
      </form>
    </Accordion>
  )
}


function SprzetSelectForm({ filtersData }) {

  const [kategorie, setKategorie] = useState(new Set());
  const [stanData, setStanData] = useState({});

  function handleKategoriaChange(e) {
    let newKategorie = new Set(kategorie);
    let kategoria_id = e.target.name.split("_").at(-1);
    if(e.target.checked) newKategorie.add(kategoria_id);
    else newKategorie.delete(kategoria_id);
    setKategorie(newKategorie);

    let stany = new Set();
    newKategorie.forEach(katID => {
      for (let stanID in filtersData["stany"][katID]) {
        stany.add(stanID);
      }
    });
    let newStanData = {};
    stany.forEach(stanID => {
      newStanData[stanID] = filtersData["stanyAll"][stanID];
    });
    setStanData(newStanData);
  }

  return (<div className="centeredForm">
    <CheckboxAccordion
      title="Status"
      name="status"
      data={filtersData["statusy"]}
    />

    <CheckboxAccordion
      title="Kategoria"
      name="kategoria"
      data={filtersData["kategorie"]}
      onChange={handleKategoriaChange}
    />

    <CheckboxAccordion
      title="Stan"
      name="stan"
      data={stanData}
    />

    <CheckboxAccordion
      title="Lokalizacja"
      name="lokalizacja"
      data={filtersData["lokalizacje"]}
    />

    <CheckboxAccordion
      title="Właściciel"
      name="wlasciciel"
      data={filtersData["podmioty"]}
    />

    <CheckboxAccordion
      title="Użytkownik"
      name="uzytkownik"
      data={filtersData["podmioty"]}
    />




  </div>)
}


export default function WyswietlSprzet() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [filtersData, setFiltersData] = useState(null);

  function fetchFilters() {
    axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/available_values`,
      {headers: authHeader()}
    )
      .then((response) => {
        if(response.data.success) setFiltersData(response.data.data);
        else setErrorMessage(response.data.message);
      }).catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
        console.log(error);
      });
  }

  function fetchData() {
    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/wyswietl`,
      new FormData(),
      {headers: authHeader()}
    )
      .then((response) => {
        setErrorMessage(response.data.message);
        if(response.data.success) setResponseData(response.data.data);
      }).catch((error) => {
      setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
      console.log(error);
      });
  }

  useEffect(() => {
    fetchFilters()
  }, []);

  return (<div className="contentDiv longForm">
    <p className="contentTitle">Tabela sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    {filtersData ?
      <SprzetSelectForm filtersData={filtersData}/>
      :
      errorMessage ?
        null
        :
        <LoadingIcon/>
    }

    {responseData && <SprzetTable array={responseData}/>}

  </div>)
}