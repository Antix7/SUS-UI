
export default function UserPanel({ username, handleNavbarButtonClick, handleLogout }) {
  return (
    <div id="userPanel">
      <p id="username">{username}</p><br/>
      <button
        className="userPanelButton"
        onClick={()=>handleNavbarButtonClick('zmien_haslo')}
      >
        Zmień hasło
      </button>
      <button className="userPanelButton" onClick={handleLogout}>Wyloguj</button>
    </div>
  )
}