import {useEffect, useState} from "react";


function Message({ text, type, handleDismiss }) {
  let colour;
  if (type === "error") {
    colour = "#ff5353";
  } else if (type === "warning") {
    colour = "#fda82a";
  } else if (type === "info") {
    colour = "#46a6f3"
  } else if (type === "success") {
    colour = "#2fd33f"
  }
  return (
    <div
      className="messageDiv disableSelect"
      style={{
        backgroundColor:colour
      }}
    >
      {text}
      <span
        className="messageCloseButton disableSelect"
        onClick={handleDismiss}
      >&times;
      </span>
    </div>
  )
}

export default function MessageBox({ message }) {

  const [messages, setMessages] = useState({});
  const [nextID, setNextID] = useState(0);

  function handleMessageAdd(message) {
    if(!message || !message.text) return;
    let nextMessages = JSON.parse(JSON.stringify(messages));
    message["id"] = nextID
    nextMessages[nextID] = message;
    setMessages(nextMessages);
    setNextID(nextID+1);
  }
  function handleMessageDismiss(id) {
    let nextMessages = JSON.parse(JSON.stringify(messages));
    delete nextMessages[id];
    setMessages(nextMessages);
  }
  
  useEffect(()=>{
    handleMessageAdd(message);
    console.log(messages);
  }, [message]);

  return (
    <div className="messageBox">
      {Object.values(messages).map(message=><Message
        text={message.text}
        type={message.type}
        key={"MessageComponent_"+message.id}
        handleDismiss={()=>handleMessageDismiss(message.id)}
      />)}
    </div>
  )
}