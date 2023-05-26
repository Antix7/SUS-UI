import crossIcon from "../img/crossIcon.png";

export default function CloseButton({ onClick, customClass }) {
  return(
    <img
      className={"closeButton " + customClass}
      src={crossIcon}
      alt="Close"
      height={30} width={30}
      onClick={onClick}
    />
  )
}