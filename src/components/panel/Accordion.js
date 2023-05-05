import {useEffect, useRef, useState} from "react";

export default function Accordion({ triggerContent, triggerClass, panelContent, panelClass }) {
  // both `Contents` ideally shouldn't be wrapped in their own containers
  // if you wish to customise their look use the `Class` props to assign a custom class

  const [shown, setShown] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const panel = useRef(null);

  useEffect(() => {
    setPanelHeight(shown ? panel.current.scrollHeight : 0);
  }, [shown, panelContent]);

  return (<>
    <div
      className={"accordionTrigger " + triggerClass}
      onClick={()=>setShown(!shown)}
    >
      {triggerContent}
    </div>
    <div
      className={"accordionPanel " + panelClass}
      ref={panel}
      style={{height:panelHeight}}
    >
      {panelContent}
    </div>

  </>)
}