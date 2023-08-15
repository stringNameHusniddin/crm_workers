import { useState } from "react"
import icon from "../../assets/icon/send.png"

export default function Inp({ setUsers, user, id }) {
    const [message, setMessage] = useState("")
    const token = localStorage.getItem("token")

    function send_data() {
        if (message !== "") {
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: message,
                    owner_id: user.id,
                    to_id: id
                })
            }

            fetch("https://crm-5l3k.onrender.com/notifications", options).then(
                res => res.json()
            ).then(
                () => {
                    fetch("https://crm-5l3k.onrender.com/user", {
                        headers: {
                            "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                            "Content-Type": "application/json",
                        }
                    }).then(res => res.json()).then(json => {
                        setUsers(json)
                    })
                }
            )
        }
    }

    return (
        <div className="message_inp">
            <input type="text" placeholder="Notifications" onChange={e => setMessage(e.target.value)} />
            <button onClick={send_data}><img src={icon} alt="" /></button>
        </div>
    )
}