import menuIcon from "../../../img/menu-icon.png"
export default function MenuButton({ id, onClick }) {
  return (
    <button className="menuButton" id={id} onClick={onClick}>
      <img src={menuIcon} alt="menu" height={30} width={30}/>
    </button>
  )
}