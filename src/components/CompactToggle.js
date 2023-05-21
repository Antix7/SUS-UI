export default function CompactToggle({ stateFalse, stateTrue, checked, onClick }) {
  return (
    <p
      className="compactToggle disableSelect"
      onClick={onClick}
    >
      {checked ? stateTrue : stateFalse}
    </p>
  )
}