import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import UsersTable from "./tables/UsersTable";
import LoadingIcon from "../../LoadingIcon";

export default function ListaUzytkownikow() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  function fetchData() {
    axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/uzytkownicy`,
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
    // fetchData() may be called twice when in dev mode due to React.StrictMode enabled
    // In production this problem is not present
  }, []);

  return (<div className="contentDiv">
    <p className="contentTitle">Lista użytkowników</p>
    <p id="errorMessage">{errorMessage}</p>

    {responseData ?
      <UsersTable array={responseData}/>
      :
      errorMessage ?
          null
          :
          <LoadingIcon/>
    }

  </div>)
}