import loadingIcon from "../img/loading-icon.gif";

export default function LoadingIcon() {
  return (
    <img
      className="loadingIcon"
      src={loadingIcon}
      alt="Loading..."
      height={50}
      width={50}
      style={{
        margin: 20
      }}
    />
  )
}