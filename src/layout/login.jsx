import logo from "../assets/images/bigLogo.png"
import "../style/login.scss"

export default function Login({ setUsername, setPassword, userName, password }) {

    async function sendLogin(e) {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
                `grant_type=&username=${userName}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const res = await fetch("http://localhost:8000/login/", requestOptions)
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json()
        localStorage.setItem("token", JSON.stringify(data))
        // location.reload()
        window.location.reload(false);
    }

    return <div className="login">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className="form">
            <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={e => sendLogin(e)}>Log in </button>
        </div>
    </div>
}  