import {useEffect, useRef, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import Accordion from "../../Accordion";
import LoadingIcon from "../../LoadingIcon";

function DropdownAccordion({ children, title, selected, data }) {

  return (<>
    <label className="formLabel">{title}</label>
    <Accordion
      triggerContent={<p className="dropdownAccordionField">{data[selected] ? data[selected] : "Opcje"}</p>}
    >
      {children}
    </Accordion>
  </>)
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

      <DropdownAccordion
        title="Status"
        selected={formdata.status}
        data={data["statusy"]}
      >
        {Object.entries(data["statusy"]).map(([id, nazwa])=> <div key={id} className="disappear">
          {/* these elements need to be wrapped in a disappearing div with key because React doesn't like mapping to multiple components */}
          <input
            type="radio"
            name="status"
            value={id}
            id={"status"+id} key={"status_"+id}
            onChange={handleFormChange}
          />
          <label htmlFor={"status"+id} className="radioLabel">
            {nazwa}
          </label><br/>
        </div>)}
      </DropdownAccordion>



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

  return (<div className="contentDiv">
    <p className="contentTitle">Dodawanie sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    {data && !errorMessage ?
      <SprzetForm data={data}/>
      :
      <LoadingIcon/>
    }

  </div>)
}