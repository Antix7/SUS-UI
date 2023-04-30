export default function MenuButton({ id, onClick }) {
  return (
    <button className="menuButton" id={id} onClick={onClick}>
      <img src="menu-icon.png" alt="menu" height={30} width={30}/>
    </button>
  )
}