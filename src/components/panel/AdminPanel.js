import {useState} from "react";
import Navbar from "../Navbar";

export default function AdminPanel({ username, handleLogout }) {

  const [activeContent, setActiveContent] = useState(null);

  function handleNavButtonClick(contentToLoad) {
    setActiveContent(contentToLoad);
  }

  return (
    <div id="adminPanel">
      <Navbar handleNavbarButtonClick={handleNavButtonClick} username={username} handleLogout={handleLogout}/>
      <div id="content">
        {activeContent}
      </div>
    </div>
  )
}