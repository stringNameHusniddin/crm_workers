import logo from "../../assets/images/logo.png"
import SideBarItem from "./sideBarItem";

import "../../style/sidebar.scss"

export default function SideBar({nav_data}) {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="items">
                {
                    nav_data.map(mal => (
                        <SideBarItem key={mal.title} data={mal} />
                    ))
                }
            </div>
        </div>
    )
}