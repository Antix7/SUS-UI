import {useEffect} from "react";
import Navbar from "./navbar/Navbar";
import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import authHeader from "../../authHeader";

export default function AdminPanel({ username, handleLogout, setUsername }) {
  const navigate = useNavigate();

  function handleNavButtonClick(address) {
    navigate(address);
  }

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth`,
        null,
        {headers: authHeader()})
        .then((response) => {
          if(response.data.success) setUsername(sessionStorage.getItem("username"));
          else navigate('/');
        });
  }, [navigate, setUsername]);

  return (
    <>
      <div id="adminPanel">
        <Navbar handleNavbarButtonClick={handleNavButtonClick} username={username} handleLogout={handleLogout}/>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}