import {useState} from "react";

export default function CompactToggle({ stateFalse, stateTrue, name }) {
  const [checked, setChecked] = useState(false);
  return (<>
    <input
      type="checkbox"
      id={name} name={name}
      className="invisibleCheckbox disableSelect"
      checked={checked}
      onClick={()=>setChecked(!checked)}
    />
    <label className="toggleLabel disableSelect" htmlFor={name}>{checked ? stateTrue : stateFalse}</label>
  </>)
}