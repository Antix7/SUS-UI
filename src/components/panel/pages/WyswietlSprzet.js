import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import SprzetTable from "./tables/SprzetTable";
import LoadingIcon from "../../LoadingIcon";


export default function WyswietlSprzet() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  function fetchData() {
    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/wyswietl`,
      new FormData(),
      {headers: authHeader()} // passing JWT
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
    fetchData()
  }, []);

  return (<div className="contentDiv">
    <p className="contentTitle">Tabela sprzętu</p>
    <p id="errorMessage">{errorMessage}</p>

    {responseData ?
      <SprzetTable array={responseData}/>
      :
      errorMessage ?
        null
        :
        <LoadingIcon/>
    }

  </div>)
}