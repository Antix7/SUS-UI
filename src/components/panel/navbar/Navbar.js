import { useState } from 'react';
import "./Navbar.css"
import UserPanel from "./UserPanel";
import NavbarButton from "./NavbarButton";
import WyswietlSprzet from "../WyswietlSprzet";
import DodajSprzet from "../DodajSprzet";
import GeneratorKluczy from "../GeneratorKluczy";
import ListaUzytkownikow from "../ListaUzytkownikow";
import Query from "../Query";

export default function Navbar({ handleNavbarButtonClick, username, handleLogout }) {

  const [sidepanelShown, setSidepanelShown] = useState(false);

  function toggleSidepanel() {
    setSidepanelShown(!sidepanelShown);
  }

  return (
    <div id="navbar">
      <div className={"sidepanel" + (sidepanelShown ? "" : " hidden")}>
        <button onClick={toggleSidepanel}>&times;</button>
        <NavbarButton text="Generator kluczy" onClick={()=>handleNavbarButtonClick(<GeneratorKluczy/>)}/>
        <NavbarButton text="Lista użytkowników" onClick={()=>handleNavbarButtonClick(<ListaUzytkownikow/>)}/>
        <NavbarButton text="Query" onClick={()=>handleNavbarButtonClick(<Query/>)}/>
      </div>
      <button onClick={toggleSidepanel}>&#9776;</button>
      <UserPanel username={username} handleNavbarButtonClick={handleNavbarButtonClick} handleLogout={handleLogout}/>
    </div>
  )
}