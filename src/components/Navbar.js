import { useState } from 'react';
import "./style/Navbar.css"
import UserPanel from "./UserPanel";
import NavbarButton from "./NavbarButton";
import WyswietlSprzet from "./WyswietlSprzet";
import DodajSprzet from "./DodajSprzet";
import GeneratorKluczy from "./GeneratorKluczy";
import ListaUzytkownikow from "./ListaUzytkownikow";
import Query from "./Query";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar({ handleNavbarButtonClick, username, handleLogout }) {

  return (
    <div id="navbar">
      <div id="navbarButtons">
        <NavbarDropdown text="Sprzęt" optionsList={[
          {text: "Wyświetl", onClick: ()=>handleNavbarButtonClick(<WyswietlSprzet/>)},
          {text: "Dodaj", onClick: ()=>handleNavbarButtonClick(<DodajSprzet/>)}
        ]}/>
        <NavbarButton text="Generator kluczy" onClick={()=>handleNavbarButtonClick(<GeneratorKluczy/>)}/>
        <NavbarButton text="Lista użytkowników" onClick={()=>handleNavbarButtonClick(<ListaUzytkownikow/>)}/>
        <NavbarButton text="Query" onClick={()=>handleNavbarButtonClick(<Query/>)}/>
      </div>
      <UserPanel username={username} handleNavbarButtonClick={handleNavbarButtonClick} handleLogout={handleLogout}/>
    </div>
  )
}