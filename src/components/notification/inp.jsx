import { useState } from "react"
import icon from "../../assets/icon/send.png"

export default function Inp({ setData, data,  id }) {
    const [message, setMessage] = useState("")

    const addMessageToData = ()=>{
        setData([...data, {
            to:id,
            message
        }])
    }

    return (
        <div className="message_inp">
            <input type="text" placeholder="Notifications" onChange={e=>setMessage(e.target.value)}/>
            <button onClick={addMessageToData}><img src={icon} alt="" /></button>
        </div>
    )
}