import NavbarButton from "./NavbarButton";
import GeneratorKluczy from "../GeneratorKluczy";
import ListaUzytkownikow from "../ListaUzytkownikow";
import Query from "../Query";

export default function NavbarSidepanel({ toggleSidepanel, handleNavbarButtonClick }) {
  return (
    <div className="sidepanel">
      <button id="closeSidebarButton" onClick={toggleSidepanel}>&times;</button>
      <NavbarButton text="Generator kluczy" onClick={()=>handleNavbarButtonClick(<GeneratorKluczy/>)}/>
      <NavbarButton text="Lista użytkowników" onClick={()=>handleNavbarButtonClick(<ListaUzytkownikow/>)}/>
      <NavbarButton text="Query" onClick={()=>handleNavbarButtonClick(<Query/>)}/>
    </div>
  )
}