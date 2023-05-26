
export default function UserPanel({ username, handleNavbarButtonClick, handleLogout }) {
  return (
    <div id="userPanel" className="disableSelect">
      <p id="username" className="disableSelect">{username}</p><br/>
      <button
        className="userPanelButton disableSelect"
        onClick={()=>handleNavbarButtonClick('zmien_haslo')}
      >
        Zmień hasło
      </button>
      <button className="userPanelButton disableSelect" onClick={handleLogout}>Wyloguj</button>
    </div>
  )
}