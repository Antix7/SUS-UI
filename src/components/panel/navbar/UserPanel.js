import ZmienHaslo from "../ZmienHaslo";

export default function UserPanel({ username, handleNavbarButtonClick, handleLogout }) {
  return (
    <div id="userPanel">
      <p id="username">{username}</p><br/>
      <button className="userPanelButton" onClick={()=>handleNavbarButtonClick(<ZmienHaslo/>)}>Zmień hasło</button>
      <button className="userPanelButton" onClick={handleLogout}>Wyloguj</button>
    </div>
  )
}