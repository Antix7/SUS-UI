
export default function ErrorMessage({ message, success }) {
  return (
    <p
    className="errorMessage" style={{
      color: success ? "green" : "red",
      display: message ? "block" : "none"
    }}
    >
      {message}
    </p>)
}