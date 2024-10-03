import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { LoginContext } from './LoginContext';
import './HeaderComponent.css'

function HeaderComponent() {
  const location = useLocation();
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

  function currentPage() {
    let pathname = (location.pathname === "/")?"/home":location.pathname;
    const page = pathname.split('/')[1];
    return `${page[0].toUpperCase()}${page.slice(1)}`;
  }
  
  return (
    <div className="header title">
      <span className="title" >Talent Recruitment :</span>
      &nbsp;
      <span>{currentPage()}</span>
    </div>
  )
}

export default HeaderComponent