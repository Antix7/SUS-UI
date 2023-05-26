import {useEffect} from "react";
import Navbar from "./navbar/Navbar";
import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import authHeader from "../../authHeader";

export default function Panel({ username, setUsername, isAdmin, setIsAdmin, handleLogout, setLoginMessage }) {
  const navigate = useNavigate();

  function handleNavButtonClick(address) {
    navigate(address);
  }

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth`,
        null,
        {headers: authHeader()})
        .then((response) => {
          if(response.data.success) {
            setUsername(sessionStorage.getItem("username"));
            setIsAdmin(sessionStorage.getItem("isAdmin"));
          }
          else {
              setLoginMessage(response.data.message);
              navigate('/');
          }
        });
  }, []);

  return (
    <>
      <div id="adminPanel">
        <Navbar
          handleNavbarButtonClick={handleNavButtonClick}
          username={username}
          handleLogout={handleLogout}
          isAdmin={isAdmin}
        />
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}