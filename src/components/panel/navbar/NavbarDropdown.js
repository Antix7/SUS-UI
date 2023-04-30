import { useState } from 'react';
import NavbarButton from "./NavbarButton";

function DropdownContent({ optionsList, onClick }) {
  return optionsList.map(option =>
    <button className="dropdownOption"
            key={option.text}
            onClick={()=>{
              onClick();
              option.onClick();
            }}>
      {option.text}
    </button>
  )
}
export default function NavbarDropdown({text, optionsList} ) {

  const [dropdownShown, setDropdownShown] = useState(false);

  function handleButtonClick() {
    setDropdownShown(!dropdownShown);
  }
  function handleOptionClick() {
    setDropdownShown(false);
  }

  return (
    <div className="dropdown">
      <NavbarButton text={text} onClick={handleButtonClick}/>
      {dropdownShown ?
        <div className="dropdownContent" onMouseLeave={()=>setDropdownShown(false)}>
          <DropdownContent optionsList={optionsList} onClick={handleOptionClick}/>
        </div> : null}
    </div>
  )
}