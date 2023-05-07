import MenuButton from "./MenuButton";
import {Link} from "react-router-dom";

function SidepanelOptions({ options, toggleSidepanel, handleNavbarButtonClick }) {
  return options.map(option =>
    <Link className="sidepanelOption"
            key={option.text}
            onClick={()=>{
              toggleSidepanel();
              // handleNavbarButtonClick(option.link);
            }}
            to={option.link}
    >
      {option.text}
    </Link>
  )
}

export default function Sidepanel({ sidepanelShown, toggleSidepanel, options, handleNavbarButtonClick }) {
  return (
    <div className={"sidepanel" + (sidepanelShown ? "" : " hidden")}>
      <MenuButton onClick={toggleSidepanel} id="sidebarCloseButton"/><br/>
      <SidepanelOptions
        options={options}
        toggleSidepanel={toggleSidepanel}
        handleNavbarButtonClick={handleNavbarButtonClick}
      />
    </div>
  )
}