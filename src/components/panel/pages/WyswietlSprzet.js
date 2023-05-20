import {useEffect, useRef, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css";
import "../../css/wyswietlSprzet.css";
import SprzetTable from "./tables/SprzetTable";
import LoadingIcon from "../../LoadingIcon";
import Accordion from "../../Accordion";
import FilterButton from "../../FilterButton";


function CheckboxAccordion({ title, name, data, onChange, Ref }) {
  return (
    <Accordion
      triggerContent={<p className="filterAccordionButton disableSelect">{title}</p>}
      panelClass="dropdownAccordionPanel"
    >
      <form id={name+"_filter_form"} ref={Ref}>
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

function SprzetSelectForm({ filtersData, onSubmit }) {

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

  const status_form = useRef();
  const kategoria_form = useRef();
  const stan_form = useRef();
  const lokalizacja_form = useRef();
  const wlasciciel_form = useRef();
  const uzytkownik_form = useRef();
  const nazwa_form = useRef();

  function FormDataToObject(formdata) {
    let object = {};
    formdata.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  }
  function handleSubmit() {
    onSubmit({
      status: FormDataToObject(new FormData(status_form.current)),
      kategoria: FormDataToObject(new FormData(kategoria_form.current)),
      stan: FormDataToObject(new FormData(stan_form.current)),
      lokalizacja: FormDataToObject(new FormData(lokalizacja_form.current)),
      wlasciciel: FormDataToObject(new FormData(wlasciciel_form.current)),
      uzytkownik: FormDataToObject(new FormData(uzytkownik_form.current)),
      nazwa: FormDataToObject(new FormData(nazwa_form.current)),
    });
  }

  return (<div className="centeredForm">

    <CheckboxAccordion
      title="Status"
      name="status"
      data={filtersData["statusy"]}
      Ref={status_form}
    />

    <CheckboxAccordion
      title="Kategoria"
      name="kategoria"
      data={filtersData["kategorie"]}
      onChange={handleKategoriaChange}
      Ref={kategoria_form}
    />

    <CheckboxAccordion
      title="Stan"
      name="stan"
      data={stanData}
      Ref={stan_form}
    />

    <CheckboxAccordion
      title="Lokalizacja"
      name="lokalizacja"
      data={filtersData["lokalizacje"]}
      Ref={lokalizacja_form}
    />

    <CheckboxAccordion
      title="Właściciel"
      name="wlasciciel"
      data={filtersData["podmioty"]}
      Ref={wlasciciel_form}
    />

    <CheckboxAccordion
      title="Użytkownik"
      name="uzytkownik"
      data={filtersData["podmioty"]}
      Ref={uzytkownik_form}
    />

    <form id="nazwa_filter_form" ref={nazwa_form}>
      <input
        className="textInput"
        type="text"
        name="nazwa"
        placeholder="Nazwa"
      />
    </form>

    <button
      className="button submitButton"
      type="button"
      onClick={handleSubmit}
    >
      Filtruj
    </button>

    <SortujForm/>

  </div>)
}
function SortujField({ title, name, handleMove }) {
  return (
    <li>
      {title}
      <button onClick={()=>handleMove(name, "up")}>Góra</button>
      <button onClick={()=>handleMove(name, "down")}>Dół</button>
    </li>
  )
}
function SortujForm() {

  const fieldsData = {
    status: <SortujField title="Status" name="status" handleMove={handleFieldMove}/>,
    kategoria: <SortujField title="Kategoria" name="kategoria" handleMove={handleFieldMove}/>,
    stan: <SortujField title="Stan" name="stan" handleMove={handleFieldMove}/>,
    lokalizacja: <SortujField title="Lokalizacja" name="lokalizacja" handleMove={handleFieldMove}/>,
    // wlasciciel: 0,
    // uzytkownik: 0,
    // nazwa: 0,
    // ilosc : 0
  };

  const [fieldsOrder, setFieldsOrder] = useState({
    "notChosen": ["status", "kategoria", "stan", "lokalizacja"], //"wlasciciel", "uzytkownik", "nazwa", "ilosc"
    "chosen": []
  });

  function handleFieldMove(name, direction) {

    const notChosenID = fieldsOrder.notChosen.indexOf(name);
    const chosenID = fieldsOrder.chosen.indexOf(name);
    let newFieldsOrder = JSON.parse(JSON.stringify(fieldsOrder));

    if(direction === "down") {
      if(notChosenID !== -1) {
        newFieldsOrder.notChosen.splice(notChosenID, 1);
        newFieldsOrder.chosen.splice(0, 0, name);
      }
      if(chosenID !== -1) { // corner case jak element jest ostatni sam się rozwiązuje
        newFieldsOrder.chosen.splice(chosenID, 1);
        newFieldsOrder.chosen.splice(chosenID+1, 0, name);
        console.log(newFieldsOrder.chosen);
      }
    }
    if(direction === "up" && chosenID !== -1) { // jeśli jest notChosen to nic się nie dzieje
      if(chosenID === 0) {
        newFieldsOrder.chosen.splice(0, 1);
        newFieldsOrder.notChosen.push(name);
      }
      if(chosenID !== 0) {
        newFieldsOrder.chosen.splice(chosenID, 1);
        newFieldsOrder.chosen.splice(chosenID-1, 0, name);
      }
    }
    setFieldsOrder(newFieldsOrder);
  }

  function compare(a, b) {
    if(a.id > b.id) return 1;
    else return -1;
  }

  return (<>
    <ol>
      <li><b>Nie sortowane</b></li>
      {fieldsOrder.notChosen.map(field => fieldsData[field])}
      <li><b>Sortowane</b></li>
      {fieldsOrder.chosen.map(field => fieldsData[field])}    </ol>
  </>)
}

function FilterSidepanel({ children, sidepanelShown }) {
  return (<div className={"filterSidepanel" + (sidepanelShown ? "" : " filterSidepanelHidden")}>
    {children}
  </div>)
}

export default function WyswietlSprzet() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [sidepanelShown, setSidepanelShown] = useState(false);

  function fetchFiltersData() {
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

  function fetchTableData(filterFormData) {
    console.log(filterFormData)
    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/wyswietl`,
      filterFormData,
      {headers: authHeader()}
    )
      .then((response) => {
        setErrorMessage(response.data.message);
        if(response.data.success) setTableData(response.data.data);
      }).catch((error) => {
      setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
      console.log(error);
      });
  }

  function handleSprzetSelectFormSubmit(filterFormData) {
    fetchTableData(filterFormData);
    setSidepanelShown(false);
  }

  useEffect(() => {
    fetchFiltersData()
  }, []);

  return (<div className="contentDiv longForm">
    <p className="contentTitle disableSelect">Tabela sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    <FilterButton onClick={()=>setSidepanelShown(!sidepanelShown)}/>

    <FilterSidepanel sidepanelShown={sidepanelShown}>
      <p className="contentTitle">Filtruj</p>
      {filtersData ?
        <SprzetSelectForm filtersData={filtersData} onSubmit={handleSprzetSelectFormSubmit}/>
        :
        errorMessage ?
          null
          :
          <LoadingIcon/>
      }
    </FilterSidepanel>

    {tableData && <SprzetTable array={tableData}/>}

  </div>)
}