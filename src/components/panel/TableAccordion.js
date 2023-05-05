import {useEffect, useRef, useState} from "react";

export default function TableAccordion({ triggerContent, triggerClass, panelContent, panelClass, colSpan, Key }) {
  // I couldn't find a way to make a universal accordion

  const [shown, setShown] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const [wrapperPadding, setWrapperPadding] = useState(0);
  const panel = useRef(null);

  useEffect(() => {
    setPanelHeight(shown ? panel.current.scrollHeight : 0);
    setWrapperPadding(shown && panelContent ? 2 : 0)
  }, [shown, panelContent]);

  return (<>
    <tr
      key={Key + "_trigger"}
      className={"accordionTrigger tableAccordionTrigger disableSelect " + triggerClass}
      onClick={()=>setShown(!shown)}
    >
      {triggerContent}
    </tr>
    <tr key={Key + "_panel"}>
      <td
        key={Key + "_panel_wrapper"}
        className="accordionPanelWrapper"
        colSpan={colSpan}
        style={{
          padding:`${wrapperPadding}px 6px`
        }}
      >
        <div
          className={"accordionPanel tableAccordionPanel " + panelClass}
          ref={panel}
          style={{height:panelHeight}}
        >
          {panelContent}
        </div>
      </td>
    </tr>
  </>)
}