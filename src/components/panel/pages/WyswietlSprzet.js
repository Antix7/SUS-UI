import {useEffect, useRef, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css";
import "../../css/wyswietlSprzet.css";
import SprzetTable from "./tables/SprzetTable";
import LoadingIcon from "../../LoadingIcon";
import Accordion from "../../Accordion";
import FilterButton from "../../FilterButton";
import Arrow from "../../Arrow";
import CompactToggle from "../../CompactToggle";


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
      sortOrder: fieldsOrder.chosen.map(value=>[value, checkedList[value]])
    });
  }

  const fields = ["status", "kategoria", "stan", "lokalizacja", "wlasciciel", "uzytkownik", "nazwa", "ilosc"];
  const [fieldsOrder, setFieldsOrder] = useState({
    "notChosen": fields,
    "chosen": []
  });
  const [checkedList, setCheckedList] = useState(
    Object.assign({}, ...fields.map(value=>{
      return {[value]: false}
    }))
  );


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

    <p className="contentTitle disableSelect" style={{marginTop:12}}>Sortuj</p>

    <SortujForm
      fieldsOrder={fieldsOrder}
      setFieldsOrder={setFieldsOrder}
      checkedList={checkedList}
      setCheckedList={setCheckedList}
    />

    <button
      className="button submitButton"
      type="button"
      onClick={handleSubmit}
    >
      Filtruj
    </button>


  </div>)
}
function SortujField({ title, name, handleMove, toggleChecked, onToggleClick }) {
  return (
    <li className="sortujField disableSelect" key={name}>
      <div className="arrowContainer">
        <Arrow onClick={()=>handleMove(name, "up")} rotation={180}/>
        <Arrow onClick={()=>handleMove(name, "down")}/>
      </div>
      <CompactToggle stateFalse="ASC" stateTrue="DESC" checked={toggleChecked} onClick={onToggleClick}/>
      {title}
    </li>
  )
}
function SortujForm({ fieldsOrder, setFieldsOrder, checkedList, setCheckedList }) {

  function handleCheckedChange(key) {
    let newCheckedList = JSON.parse(JSON.stringify(checkedList));
    newCheckedList[key] = !checkedList[key];
    setCheckedList(newCheckedList);
  }

  const fieldsBuildData = [
    ["status", "Status"],
    ["kategoria", "Kategoria"],
    ["stan", "Stan"],
    ["lokalizacja", "Lokalizacja"],
    ["wlasciciel", "Właściciel"],
    ["uzytkownik", "Użytkownik"],
    ["nazwa", "Nazwa"],
    ["ilosc", "Ilość"]
  ]

  const fieldsData = Object.assign({}, ...fieldsBuildData.map(value => {
    return {
      [value[0]]: <SortujField
        title={value[1]}
        name={value[0]}
        handleMove={handleFieldMove}
        toggleChecked={checkedList[value[0]]}
        onToggleClick={()=>handleCheckedChange(value[0])}
        key={value[0]+"_element"} // f u React
      />
    };
  }
  ));

  function handleFieldMove(name, direction) {

    const notChosenID = fieldsOrder.notChosen.indexOf(name);
    const chosenID = fieldsOrder.chosen.indexOf(name);
    let newFieldsOrder = JSON.parse(JSON.stringify(fieldsOrder));

    if(direction === "down") {
      if(notChosenID !== -1) {
        newFieldsOrder.notChosen.splice(notChosenID, 1);
        newFieldsOrder.chosen.push(name);
      }
      if(chosenID !== -1) { // corner case jak element jest ostatni sam się rozwiązuje
        newFieldsOrder.chosen.splice(chosenID, 1);
        newFieldsOrder.chosen.splice(chosenID+1, 0, name);
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

  return (<>
    <ol>
      <div className="fieldsContainer" key="fieldsContainer_1">

        {fieldsOrder.notChosen.map(field => fieldsData[field])}
      </div>
      <div className="fieldsContainer" key="fieldsContainer_2">
        <p>Sortuj według</p>
        {fieldsOrder.chosen.map(field => fieldsData[field])}
      </div>
    </ol>
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
    fetchFiltersData();
    fetchTableData();
  }, []);

  function handleUsun(id) {
    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/usun_sprzet`,
      {id: id},
      {headers: authHeader()}
    )
      .then((response) => {
        fetchTableData();
      }).catch((error) => {
      setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
      console.log(error);
    });
  }

  return (<div className="contentDiv longForm">
    <p className="contentTitle disableSelect">Tabela sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    <FilterButton onClick={()=>setSidepanelShown(!sidepanelShown)}/>

    <FilterSidepanel sidepanelShown={sidepanelShown}>
      <p className="contentTitle disableSelect">Filtruj</p>
      {filtersData ?
        <SprzetSelectForm filtersData={filtersData} onSubmit={handleSprzetSelectFormSubmit}/>
        :
        errorMessage ?
          null
          :
          <LoadingIcon/>
      }
    </FilterSidepanel>

    {tableData && <SprzetTable array={tableData} handleUsun={handleUsun}/>}

  </div>)
}