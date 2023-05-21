import arrowIcon from "../img/arrow.png"
export default function Arrow({ rotation=0, onClick }) {
  return(
    <img
      className="arrow"
      src={arrowIcon}
      alt="arrow"
      width={12} height={12}
      onClick={onClick}
      style={{transform: `rotate(${rotation}deg)`}}
    />
  )
}