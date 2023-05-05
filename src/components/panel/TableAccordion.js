import {useEffect, useRef, useState} from "react";

export default function TableAccordion({ triggerContent, triggerClass, panelContent, panelClass, colSpan }) {
  // I couldn't find a way to make a universal accordion

  const [shown, setShown] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const [wrapperPadding, setWrapperPadding] = useState(0);
  const panel = useRef(null);

  useEffect(() => {
    setPanelHeight(shown ? panel.current.scrollHeight : 0);
    setWrapperPadding(shown ? 2 : 0)
  }, [shown, panelContent]);

  return (<>
    <tr
      className={"accordionTrigger tableAccordionTrigger " + triggerClass}
      onClick={()=>setShown(!shown)}
    >
      {triggerContent}
    </tr>
    <tr>
      <td
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