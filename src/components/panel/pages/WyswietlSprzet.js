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
import {useNavigate} from "react-router-dom";
import {type} from "@testing-library/user-event/dist/type";


function CheckboxAccordion({ title, name, data, onChange, Ref, additionalContent }) {
  return (
    <Accordion
      triggerContent={<p className="filterAccordionButton disableSelect">{title}</p>}
      panelClass="dropdownAccordionPanel"
    >
      <form id={name+"_filter_form"} ref={Ref}>
        {additionalContent}
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

function SprzetSelectForm({ filtersData, setFilterFormData }) {

  const [kategorie, setKategorie] = useState(new Set());
  const [stanData, setStanData] = useState({});
  const [czyUsuniete, setCzyUsuniete] = useState(false);

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
  const box_id_form = useRef();

  function FormDataToObject(formdata) {
    let object = {};
    formdata.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  }
  function handleSubmit() { // submitting handled by useEffect on parent component
    setFilterFormData({
      status: FormDataToObject(new FormData(status_form.current)),
      kategoria: FormDataToObject(new FormData(kategoria_form.current)),
      stan: FormDataToObject(new FormData(stan_form.current)),
      lokalizacja: FormDataToObject(new FormData(lokalizacja_form.current)),
      wlasciciel: FormDataToObject(new FormData(wlasciciel_form.current)),
      uzytkownik: FormDataToObject(new FormData(uzytkownik_form.current)),
      nazwa: FormDataToObject(new FormData(nazwa_form.current)),
      box_id: FormDataToObject(new FormData(box_id_form.current)),
      sortOrder: fieldsOrder.chosen.map(value=>[value, checkedList[value]]),
      usuniete: czyUsuniete
    });
  }

  const fields = ["status", "kategoria", "stan", "lokalizacja", "box_id", "wlasciciel", "uzytkownik", "nazwa", "ilosc"];
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
      additionalContent={kategorie.size===0 ? <p>Najpierw wybierz kategorię</p> : null}
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

    <form id="box_id_filter_form" ref={box_id_form}>
      <input
        className="textInput"
        type="text"
        name="box_id"
        placeholder="Numer pudła"
      />
    </form>

    <p className="contentTitle disableSelect" style={{marginTop:12}}>Sortuj</p>

    <SortujForm
      fieldsOrder={fieldsOrder}
      setFieldsOrder={setFieldsOrder}
      checkedList={checkedList}
      setCheckedList={setCheckedList}
    />

    <div className="checkboxContainer">
      <input
        type="checkbox"
        id="czy_usuniete" name="czy_usuniete"
        checked={czyUsuniete}
        onChange={()=>setCzyUsuniete(!czyUsuniete)}
      />
      <label htmlFor="czy_usuniete" className="checkboxLabel">Wyświetl tylko usunięte</label>
    </div>

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
    ["box_id", "Numer pudła"],
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
      if(chosenID === newFieldsOrder.chosen.length-1) {
        newFieldsOrder.chosen.pop();
        newFieldsOrder.notChosen.splice(0, 0, name);
      }
      else if(chosenID !== -1) {
        newFieldsOrder.chosen.splice(chosenID, 1);
        newFieldsOrder.chosen.splice(chosenID+1, 0, name);
      }
    }
    if(direction === "up") {
      if(notChosenID !== -1) {
        newFieldsOrder.notChosen.splice(notChosenID, 1);
        newFieldsOrder.chosen.push(name);
      }
      if(chosenID !== -1 && chosenID !== 0) {
        newFieldsOrder.chosen.splice(chosenID, 1);
        newFieldsOrder.chosen.splice(chosenID-1, 0, name);
      }
    }
    setFieldsOrder(newFieldsOrder);
  }

  return (<>
    <ol>
      <div className="fieldsContainer" key="fieldsContainer_1">
        <p className="sortujFieldFake"></p> {/* maintain proper width */}
        <p className="sortujFieldsTitle">Kolejność sortowania</p>
        {fieldsOrder.chosen.map(field => fieldsData[field])}
      </div>
      <div className="fieldsContainer" key="fieldsContainer_2">
        <p className="sortujFieldFake"></p> {/* maintain proper width */}
        <p className="sortujFieldsTitle">Dostępne pola</p>
        {fieldsOrder.notChosen.map(field => fieldsData[field])}
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
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [filtersData, setFiltersData] = useState(null);
  const [sidepanelShown, setSidepanelShown] = useState(false);
  const [filterFormData, setFilterFormData] = useState({});
  const [zdjeciePath, setZdjeciePath] = useState(null);
  const modalRef = useRef();

  function fetchFiltersData() {
    axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/available_values`,
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

  function fetchTableData() {
    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/wyswietl`,
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
  
  useEffect(()=>{ // handling submitting the filter form
    fetchTableData();
    setSidepanelShown(false);
  }, [filterFormData]);

  useEffect(() => {
    fetchFiltersData();
    fetchTableData();
  }, []);

  function handleUsun(id) {
    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/usun_sprzet`,
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
  function handleShowZdjecie(id) {
    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/wyswietl_zdjecie`,
      {id: id},
      {headers: authHeader(), responseType: 'blob'}
    )
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data); // Create a temporary URL for the image file
        setZdjeciePath(imageUrl);
        showModal();
      })
      .catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
        console.log(error);
      });
  }

  function showModal() {
    modalRef.current.showModal();
    modalRef.current.style.display="flex"; // incorrect <dialog> size fix
  }
  function hideModal() {
    modalRef.current.close();
    setZdjeciePath(null);
    modalRef.current.style.display="none"
  }


  function handleEdytuj(id) {
    navigate(`../edytuj_sprzet/${id}`);
  }

  function handleZabierz(id) {
    const ile = prompt("Ile chcesz zabrać?");
    axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/zabierz`,
        {amount: ile, id: id},
        {headers: authHeader()}
    )
        .then((response) => {
          if(response.data.success) {
            setTimeout(fetchTableData, 100);
            return;
          }
          setErrorMessage(response.data.message);
        })
        .catch((error) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
          console.log(error);
        });
  }

  function handleOdloz(id) {
    axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/odloz`,
        {id: id},
        {headers: authHeader()}
    )
        .then((response) => {
          if(response.data.success) {
            setTimeout(fetchTableData, 100);
            return;
          }
          setErrorMessage(response.data.message);
        })
        .catch((error) => {
          setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
          console.log(error);
        });
  }

  function handleZapomnij(id) {
    axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/zapomnij`,
        {id: id},
        {headers: authHeader()}
    )
        .then((response) => {
          if(response.data.success) {
            setTimeout(fetchTableData, 100);
            return;
          }
          setErrorMessage(response.data.message);
        })
        .catch((error) => {
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
        <SprzetSelectForm filtersData={filtersData} setFilterFormData={setFilterFormData}/>
        :
        errorMessage ?
          null
          :
          <LoadingIcon/>
      }
    </FilterSidepanel>

    {tableData
        &&
        <SprzetTable
            array={tableData}
            handleUsun={handleUsun}
            handleEdytuj={handleEdytuj}
            handleZabierz={handleZabierz}
            handleOdloz={handleOdloz}
            handleZapomnij={handleZapomnij}
            handleShowZdjecie={handleShowZdjecie}
        />}

    <dialog
      className="modal"
      ref={modalRef}
      onClick={()=>hideModal()}
    >
      <img className="modalImage" src={zdjeciePath} alt="Coś poszło nie tak :/"/>
    </dialog>
       
  </div>)
}