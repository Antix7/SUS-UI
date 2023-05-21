import {useEffect, useRef, useState} from "react";

export default function Accordion({ triggerContent, triggerClass, panelClass, children, altTrigger }) {
  // both `Contents` ideally shouldn't be wrapped in their own containers
  // if you wish to customise their look use the `Class` props to assign a custom class

  const [shown, setShown] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const childrenRef = useRef(null);

  useEffect(() => {
    setPanelHeight(shown ? childrenRef.current.scrollHeight : 0);
  }, [shown, children]);
  
  useEffect(() => {
    setShown(false);
  }, [altTrigger])

  return (<>
    <div
      className={"accordionTrigger " + triggerClass}
      onClick={()=>setShown(!shown)}
    >
      {triggerContent}
    </div>
    <div
      className={"accordionPanel " + panelClass}
      style={{height:panelHeight}}
    >
      <div ref={childrenRef}>
        {children}
      </div>
    </div>

  </>)
}