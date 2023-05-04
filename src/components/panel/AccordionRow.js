import {useState, useRef, useEffect} from "react";


export default function AccordionRow({ colSpan, triggerContent, accordionContent }) {

  const [shown, setShown] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const element = useRef(null);

  useEffect(() => {
    setAccordionHeight(shown ? element.current.scrollHeight : 0);
  }, [accordionContent, shown]);

  return (<>
    <tr className="tableRow" onClick={()=>setShown(!shown)}>
      {triggerContent}
    </tr>
    <tr>
      <td className="accordionTD" colSpan={colSpan}>
        <div
          className={"accordion"}
          ref={element}
          style={{height:accordionHeight}}
        >
          {accordionContent}
        </div>
      </td>
    </tr>
  </>)
}