import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import Accordion from "../../Accordion";
import LoadingIcon from "../../LoadingIcon";
import ErrorMessage from "../../ErrorMessage";
import {useParams} from "react-router-dom";

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
          // one of them is a string and the other is a number, so == has to be used in order for this to work
          checked={id == selected}
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


function SprzetForm({ data, handleSubmit, errorMessage, isErrorGood, defaultValues, buttonValue, isEditing }) {

  const [formdata, setFormdata] = useState({
    status: 0,
    kategoria: 0,
    stan: 0,
    lokalizacja: 0,
    wlasciciel: 0,
    uzytkownik: 0
  });

  // because react is a fucking mess
  const [defaultIlosc, setDefaultIlosc] = useState(1);

  if(!defaultValues) {
    defaultValues = {
      sts: 0,
      kat: 0,
      stn: 0,
      lok: 0,
      wla: 0,
      uzy: 0,
      nazwa: "",
      opis: "",
      ilosc: defaultIlosc
    }
  }

  useEffect(() => {
    setFormdata({
      status: defaultValues.sts,
      kategoria: defaultValues.kat,
      stan: defaultValues.stn,
      lokalizacja: defaultValues.lok,
      wlasciciel: defaultValues.wla,
      uzytkownik: defaultValues.uzy
    });
    setDefaultIlosc(defaultValues.ilosc);
  }, [defaultValues]);



  function handleFormChange(e) {
    const nextFormdata = Object.assign({}, formdata);
    nextFormdata[e.target.name] = e.target.value;
    setFormdata(nextFormdata);
  }

  useEffect(() => {
    const nextFormdata = Object.assign({}, formdata);
    nextFormdata.stan = (formdata.kategoria === defaultValues.kat ? defaultValues.stn : 0);
    setFormdata(nextFormdata);
  }, [formdata.kategoria]);

  return(<>
    <form className="centeredForm" id="dodajSprzetForm" onSubmit={handleSubmit}>

      <label htmlFor="nazwa" className="formLabel disableSelect">Nazwa</label>
      <input
        className="textInput withLabel"
        name="nazwa" id="nazwa"
        type="text"
        defaultValue={defaultValues.nazwa}
      />

      <label htmlFor="ilosc" className="formLabel disableSelect">Ilość</label>
      <input
        className="textInput withLabel"
        name="ilosc" id="ilosc"
        type="number"
        defaultValue={defaultIlosc}
        // react is a fucking mess so in order for THIS SPECIFIC INPUT to load with the default value it has to have a key with the same default value
        key={defaultIlosc}
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
        defaultValue={defaultValues.opis}
      />

       {/*TODO: przy edytowaniu tak samo jak w legacy */}
      <label htmlFor="zdjecieInput" className="formLabel disableSelect">{isEditing ? "Zdjęcie (puste = bez zmian)" : "Zdjęcie"}</label>
      <input
        className="textInput"
        type="file" accept="image/*"
        name="zdjecie" id="zdjecieInput"
      />

      <ErrorMessage
        message={errorMessage}
        success={isErrorGood}
      />

      <button className="button" type="submit" id="submitButton">{buttonValue}</button>

    </form>
  </>)
}

export default function DodajSprzet({isEditing}) {
  const {id} = useParams();
  const editingID = isEditing ? id : null;

  const [contentTitle, setContentTitle] = useState("Dodawanie sprzętu");
  const [buttonValue, setButtonValue] = useState("Dodaj");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorGood, setIsErrorGood] = useState(null);
  const [data, setData] = useState(null);
  // let defaultFormValues = null;
  const [defaultValues, setDefaultValues] = useState(null);


  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/available_values`,
      {headers: authHeader()}
    )
      .then((response) => {
        setErrorMessage(response.data.message);
        if(response.data.success) {
          setData(response.data.data);
          setIsErrorGood(true);
        }
        else setIsErrorGood(false);
        if(!isEditing)
          return;
        setContentTitle("Edytowanie sprzętu");
        setButtonValue("Edytuj");
        axios.post(
            `${process.env.REACT_APP_SERVER_ADDRESS}/editing_info`,
            {editid: editingID},
            {headers: authHeader()}
        )
            .then((response) => {
              if(!response.data.success) {
                setIsErrorGood(false);
                setErrorMessage(response.data.message);
              }
              setDefaultValues(response.data);
            })
            .catch((error) => {
              setIsErrorGood(false);
              setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
              console.log(error);
            })
      })
      .catch((error) => {
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
        console.log(error);
      });
  }, []);


  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    if(isEditing)
      formData.append("editid", editingID);

    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/${editingID ? "edytuj" : "dodaj"}`,
      formData,
      {headers: authHeader()}
    )
      .then((response) => {
        setErrorMessage(response.data.message);
        if(response.data.success) {
          setErrorMessage((editingID ? "Edytowano przedmiot w bazie danych" : "Dodano przedmiot do bazy danych"));
          setIsErrorGood(true);
        }
        else setIsErrorGood(false);
      }).catch((error) => {
        setIsErrorGood(false);
        setErrorMessage("Wystąpił błąd w komunikacji z serwerem")
        console.log(error);
    });
  }

  return (<div className="contentDiv longForm">
    <p className="contentTitle">{contentTitle}</p>


    {data ?
      <SprzetForm
        data={data}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        isErrorGood={isErrorGood}
        defaultValues={defaultValues}
        buttonValue={buttonValue}
        isEditing={isEditing}
      />
      :
        errorMessage ?
              <ErrorMessage
                  message={errorMessage}
                  success={isErrorGood}
              />
              :
              <LoadingIcon/>
    }

  </div>)
}