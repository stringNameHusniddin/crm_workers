import delete_ from "../../assets/icon/delete.svg"

export default function Item({message, messages, setData, id}){
    const token = localStorage.getItem("token")
    const delete_message = () => {

        const options = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                "Content-Type": "application/json",
            }
        }

        fetch(`https://crm-5l3k.onrender.com/notes/${id}`, options).then(
            res => res.json()
        ).then(
            () => {
                const new_data = messages.filter(message_=>message_.id !== id)
                setData(new_data)
            }
        )
    }

    return(
        <div className="n_message">
            <p>{message}</p>
            <img onClick={delete_message} src={delete_} alt="" style={{width:30}} className="n_icon"/>
        </div>
    )
}