export default function NavbarButton({ text, onClick }) {
  return (
    <button className="navbarButton" onClick={onClick}>{text}</button>
  )
}