import { useContext } from "react";
import { Link } from "react-router-dom"
import { LoginContext } from './LoginContext';
import './FooterComponent.css'

function FooterComponent() {
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);
  let userType = (user && user.type)?user.type:"guest";

  return (
    <div className="footer">
      <Link to={'./home'}>Home</Link>&nbsp;
      <span className={(userType.toLowerCase() === "administrator")?"":"hidden"}>
      <Link to={'./admin'}>Admin</Link>&nbsp;
      <Link to={'./candidate'}>Candidate</Link>&nbsp;
      <Link to={'./manager'}>Manager</Link>&nbsp;
      <Link to={'./login'}>Login</Link>&nbsp;
      <Link to={'./register'}>Register</Link>&nbsp;
      <Link to={'./guest'}>Guest</Link>&nbsp;
      </span>
    </div>
  )
}

export default FooterComponent