import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import UsersTable from "./tables/UsersTable";
import LoadingIcon from "../../LoadingIcon";
import ErrorMessage from "../../ErrorMessage";

export default function ListaUzytkownikow() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  function fetchData() {
    axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/uzytkownicy`,
      {headers: authHeader()} // passing JWT
    )
      .then((response) => {
        if(!response.data.success) setErrorMessage(response.data.message);
        else setResponseData(response.data.data);
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

  function handleUsun(username) {
    axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/usun_uzytkownika`,
        {username: username},
        {headers: authHeader()}
    )
        .then((response) => {
          fetchData();
          if(!response.data.success) setErrorMessage(response.data.message);
        }).catch((error) => {
      setErrorMessage("Wystąpił błąd w komunikacji z serwerem");
      console.log(error);
    });
  }

  return (<div className="contentDiv">
    <p className="contentTitle">Lista użytkowników</p>
    <ErrorMessage message={errorMessage} success={false}/>

    {responseData ?
      <UsersTable array={responseData} handleUsun={handleUsun}/>
      :
      errorMessage ?
          null
          :
          <LoadingIcon/>
    }

  </div>)
}