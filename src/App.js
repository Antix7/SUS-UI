import React, {useState} from 'react';
import './App.css';
import Panel from "./components/panel/Panel";
import LoginPanel from "./components/login/LoginPanel";
import {Route, Routes, useNavigate} from "react-router-dom";
import ZmienHaslo from "./components/panel/pages/ZmienHaslo";
import WyswietlSprzet from "./components/panel/pages/WyswietlSprzet";
import DodajSprzet from "./components/panel/pages/DodajSprzet";
import GeneratorKluczy from "./components/panel/pages/GeneratorKluczy";
import ListaUzytkownikow from "./components/panel/pages/ListaUzytkownikow";
import Query from "./components/panel/pages/Query";
import Welcome from "./components/panel/pages/Welcome";
import AktywujKonto from "./components/login/AktywujKonto";
import ResetujHaslo from "./components/login/ResetujHaslo";
import NoPage from "./components/panel/pages/NoPage";
import ErrorMessage from "./components/MessageBox";


export default function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  // this is safe because server endpoints require admin information stored in token
  const [isAdmin, setIsAdmin] = useState(null);

  function handleLogin(username, token, isAdmin) {
    setUsername(username);
    setIsAdmin(isAdmin);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("isAdmin", isAdmin);
    navigate('/panel');
  }

  function handleResetLogin(username, token) {
    setUsername(username);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", token);
  }

  function handleLogout() {
    setUsername(null);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    navigate('/');
  }

  return (<>
      <Routes>
        <Route path='/' element={
          <LoginPanel
            handleLogin={handleLogin}
          />}
        />
        <Route path='*' element={<NoPage/>}/>
        <Route path='/aktywuj_konto' element={<AktywujKonto/>} />
        <Route path='/resetuj_haslo' element={<ResetujHaslo handleResetLogin={handleResetLogin}/>} />
        <Route path='/panel' element={
          <Panel
            username={`${username}@${process.env.REACT_APP_ORGANISATION_NAME}`}
            setUsername={setUsername}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            handleLogout={handleLogout}
          />
        }>
          <Route index element={<Welcome username={username}/>} />
          <Route path='zmien_haslo' element={<ZmienHaslo/>} />
          <Route path='wyswietl_sprzet' element={<WyswietlSprzet/>} />
          <Route path='edytuj_sprzet'>
              <Route index element={<ErrorMessage success={false} message="brak id" />} />
              <Route path=':id' element={<DodajSprzet isEditing={true} />} />
            </Route>
          <Route path='dodaj_sprzet' element={<DodajSprzet/>} />
          <Route path='generator_kluczy' element={<GeneratorKluczy/>} />
          <Route path='lista_uzytkownikow' element={<ListaUzytkownikow/>} />
          <Route path='query' element={<Query/>} />
        </Route>
      </Routes>
  </>)
}