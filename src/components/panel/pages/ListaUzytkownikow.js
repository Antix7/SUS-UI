import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import UsersTable from "./tables/UsersTable";
import LoadingIcon from "../../LoadingIcon";
import ErrorMessage from "../../MessageBox";
import MessageBox from "../../MessageBox";

export default function ListaUzytkownikow() {

  const [message, setMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);

  function fetchData() {
    axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/uzytkownicy`,
      {headers: authHeader()} // passing JWT
    )
      .then((response) => {
        if(!response.data.success) setMessage({
          text: response.data.message,
          type: "error"
        });
        else setResponseData(response.data.data);
      }).catch((error) => {
        setMessage({
          text: "Wystąpił błąd w komunikacji z serwerem",
          type: "error"
        });
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
        if(!response.data.success) setMessage({
          text: response.data.message,
          type: "error"
        });
        fetchData();
      }).catch((error) => {
        setMessage({
          text: "Wystąpił błąd w komunikacji z serwerem",
          type: "error"
        });
    });
  }

  return (<div className="contentDiv">
    <p className="contentTitle">Lista użytkowników</p>
    <MessageBox message={message}/>

    {responseData ?
      <UsersTable array={responseData} handleUsun={handleUsun}/>
      :
      <LoadingIcon/>
    }

  </div>)
}