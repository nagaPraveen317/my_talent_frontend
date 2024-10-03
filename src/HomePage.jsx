import { useNavigate } from "react-router-dom"
import { LoginContext } from './LoginContext';
import { useContext } from "react";
import './HomePage.css';

export default function HomePage() {
    const { isLoggedIn, user } = useContext(LoginContext);
    const navigate = useNavigate();

    function onEnterClick() {
        console.log("Clicked enter site button");
        const type = isLoggedIn ? user.type : "guest";
        console.log("User login type: ", type);
        switch (type) {
            case "guest":
                navigate("/guest");
                break;
            case "Hiring_Manager":
                navigate("/manager");
                break;
            case "Candidate":
                navigate("/candidate");
                break;
            case "Administrator":
                navigate("/admin");
                break;
            default:
                navigate("/"); // fallback in case type is undefined
                break;
        }
    }

    const text = `
    Welcome to Talent Recruitment! Please log in to access features
    of our application.

    You can still access the site as a guest but keep in mind 
    not all features are available for guests. 
    `;

    return (
        <div>
            <div className="content">
                <pre>{text}</pre>
                <button onClick={onEnterClick}>Enter Site</button>
            </div>
        </div>
    );
}