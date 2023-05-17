
export default function ErrorMessage({ message, success }) {
  return (<p
    className="errorMessage" style={{color: success ? "lime" : "red"}}>
    {message}
  </p>)
}