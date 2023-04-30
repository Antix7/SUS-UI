import { useState } from 'react';
import "./Navbar.css"
import UserPanel from "./UserPanel";
import WyswietlSprzet from "../WyswietlSprzet";
import DodajSprzet from "../DodajSprzet";
import GeneratorKluczy from "../GeneratorKluczy";
import ListaUzytkownikow from "../ListaUzytkownikow";
import Query from "../Query";
import MenuButton from "./MenuButton";
import Sidepanel from "./Sidepanel";

export default function Navbar({ handleNavbarButtonClick, username, handleLogout }) {

  const [sidepanelShown, setSidepanelShown] = useState(false);

  function toggleSidepanel() {
    setSidepanelShown(!sidepanelShown);
  }

  const sidepanelOptions = [
    {text: "Wyświetl sprzęt", link:<WyswietlSprzet/>},
    {text: "Dodaj sprzęt", link:<DodajSprzet/>},
    {text: "Generator kluczy", link:<GeneratorKluczy/>},
    {text: "Lista użytkowników", link:<ListaUzytkownikow/>},
    {text: "Query", link:<Query/>}
  ]

  return (
    <div id="navbar">
      <Sidepanel
        sidepanelShown={sidepanelShown}
        toggleSidepanel={toggleSidepanel}
        options={sidepanelOptions}
        handleNavbarButtonClick={handleNavbarButtonClick}
      />

      <MenuButton onClick={toggleSidepanel} id="sidebarOpenButton"/>
      <UserPanel
        username={username}
        handleNavbarButtonClick={handleNavbarButtonClick}
        handleLogout={handleLogout}
      />
    </div>
  )
}