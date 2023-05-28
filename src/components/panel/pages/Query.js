import {useState} from "react";
import axios from "axios";
import authHeader from "../../../authHeader";
import "../../css/contentPage.css"
import ErrorMessage from "../../MessageBox";
import MessageBox from "../../MessageBox";

export default function Query() {

  const [message, setMessage] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setQueryResult(null);

    const form = e.target;
    const formData = new FormData(form);

    axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/query`,
      formData,
      {headers: authHeader()} // passing JWT
    )
      .then((response) => {
        if(response.data.success) {
          setQueryResult(JSON.stringify(response.data.result));
        }
        else setMessage({
          text: response.data.message,
          type: "error"
        });
      }).catch((error) => {
        setMessage({
          text: "Wystąpił błąd w komunikacji z serwerem",
          type: "error"
        });
      console.log(error);
      });
  }

  return (<div className="contentDiv">
    <p className="contentTitle">Własne query do bazy danych</p>
    <form
      className="centeredForm"
      id="queryForm"
      onSubmit={handleSubmit}
    >
      <textarea
        className="textareaInput textInput"
        name="query"
        placeholder="Query"
        rows="10"
      ></textarea>

      <button className="button" type="submit" id="submitButton">Wykonaj</button>
    </form>

    <MessageBox message={message}/>

    <p id="queryResult">{queryResult}</p>
  </div>)
}