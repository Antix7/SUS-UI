import {useState, useRef, useEffect} from "react";
import "./css/contentPage.css"

export default function AccordionDiv({trigger, children}) {

  const [shown, setShown] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const element = useRef(null);

  useEffect(() => {
    setAccordionHeight(shown ? element.current.scrollHeight : 0);
  }, [children, shown]);

  return (
      <div className="accordionDiv">
        <span onClick={()=>setShown(!shown)}>
          {trigger}
        </span>
        <div
            className={"accordion"}
            ref={element}
            style={{height:accordionHeight}}
        >
          {children}
        </div>
      </div>
  )
};