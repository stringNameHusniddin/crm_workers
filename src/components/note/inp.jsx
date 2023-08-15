import { useState } from "react"
import icon from "../../assets/icon/send.png"

export default function Inp({ setData, data, id }) {
    const [message, setMessage] = useState("")
    const token = localStorage.getItem("token")

    const addMessageToData = () => {

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner_id: id,
                text: message
            })
        }

        fetch("https://crm-5l3k.onrender.com/notes", options).then(
            res => res.json()
        ).then(
            json => setData([...data, json])
        )
        setMessage("")
    }

    return (
        <div className="message_inp">
            <input value={message} type="text" placeholder="Notifications" onChange={e => setMessage(e.target.value)} />
            <button onClick={addMessageToData}><img src={icon} alt="" /></button>
        </div>
    )
}