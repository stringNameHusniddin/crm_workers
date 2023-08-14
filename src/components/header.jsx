import { useNavigate } from "react-router-dom"
import searchIcon from "../assets/icon/search.svg"

import "../style/header.scss"

export default function Header({ user }) {

    const navigate = useNavigate("/")

    return (
        <div className="header">
            <div className="searchBox">
                <input className="inp" type="text" placeholder="Search..." />
                <img className="icon" src={searchIcon} alt="" />
            </div>
            <div className="profileLink">
                <div>
                    <p>Welcome</p>
                    <p className="name">{user.username}</p>
                </div>
                <button className="logOut" onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.reload(false)
                    navigate("/")
                }} style={{marginLeft:"20px"}}>Log out</button>
            </div>
        </div>
    )
}