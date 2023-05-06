import React, {useEffect, useState} from 'react';
import './App.css';
import AdminPanel from "./components/panel/AdminPanel";
import LoginPanel from "./components/login/LoginPanel";
import axios from "axios";
import authHeader from "./authHeader";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ZmienHaslo from "./components/panel/pages/ZmienHaslo";
import WyswietlSprzet from "./components/panel/pages/WyswietlSprzet";
import DodajSprzet from "./components/panel/pages/DodajSprzet";
import GeneratorKluczy from "./components/panel/pages/GeneratorKluczy";
import ListaUzytkownikow from "./components/panel/pages/ListaUzytkownikow";
import Query from "./components/panel/pages/Query";

export default function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);

  function handleLogin(username, token) {
    setUsername(username);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    navigate('/Panel');
  }
  function handleLogout() {
    setUsername(null);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    navigate('/');
  }

  return (
    <>
{/*      {username ?
        <AdminPanel
          username={`${username}@${process.env.REACT_APP_ORGANISATION_NAME}`}
          handleLogout={handleLogout}
        />
        :
        <LoginPanel
          handleLogin={handleLogin}
        />
      }*/}

        <Routes>
          <Route path='/' element={
            <LoginPanel
                handleLogin={handleLogin}
            />
          } />
          <Route path='/Panel' element={
            <AdminPanel
                username={`${username}@${process.env.REACT_APP_ORGANISATION_NAME}`}
                handleLogout={handleLogout}
                setUsername={setUsername}
            />
          } >
            <Route index element={<div id="content"> Witaj w SUSie </div>} />
            <Route path='ZmienHaslo' element={<ZmienHaslo />} />
            <Route path='WyswietlSprzet' element={<WyswietlSprzet />} />
            <Route path='DodajSprzet' element={<DodajSprzet />} />
            <Route path='GeneratorKluczy' element={<GeneratorKluczy />} />
            <Route path='ListaUzytkownikow' element={<ListaUzytkownikow />} />
            <Route path='Query' element={<Query />} />
          </Route>
        </Routes>
    </>
  )
}


