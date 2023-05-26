import { useState } from 'react';
import "./Navbar.css"
import UserPanel from "./UserPanel";
import MenuButton from "./MenuButton";
import Sidepanel from "./Sidepanel";

export default function Navbar({ handleNavbarButtonClick, username, handleLogout, isAdmin }) {

  const [sidepanelShown, setSidepanelShown] = useState(false);

  function toggleSidepanel() {
    setSidepanelShown(!sidepanelShown);
  }

  let sidepanelOptions = [
    {text: "Wyświetl sprzęt", link: 'wyswietl_sprzet'},
    {text: "Dodaj sprzęt", link:'dodaj_sprzet'},
  ]
  if(isAdmin === "true") {
    sidepanelOptions = [...sidepanelOptions,
      {text: "Generator kluczy", link:'generator_kluczy'},
      {text: "Lista użytkowników", link:'lista_uzytkownikow'},
      {text: "Query", link:'query'}
    ]
  }

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