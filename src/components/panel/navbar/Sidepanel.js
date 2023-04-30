import MenuButton from "./MenuButton";

function SidepanelOptions({ options, toggleSidepanel, handleNavbarButtonClick }) {
  return options.map(option =>
    <button className="sidepanelOption"
            key={option.text}
            onClick={()=>{
              toggleSidepanel();
              handleNavbarButtonClick(option.link);
            }}>
      {option.text}
    </button>
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