import { useState } from "react"

export default function Item({ data, i, setWorks, works }) {

    const [modalStyle, setModalStyle] = useState({
        display: "none"
    })

    const token = localStorage.getItem("token")

    function changeStatus(status, e) {
        e.stopPropagation();
        const new_works = works.map(work => {
            if (work.id === data.id) {
                return {
                    ...work,
                    status
                }
            }
            return work
        })
        setModalStyle({
            display: "none"
        })
        send_data(status, data.id)
        setWorks(new_works)
    }
    function send_data(status, id) {

        const options = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.id,
                name: data.name,
                join_data: data.join_data,
                complete_data: data.complete_data,
                status,
                to_id: data.to.id,
                owner_id: data.owner.id
            })
        }

        fetch(`http://127.0.0.1:8000/work/${id}`, options)
    }


    return (
        <div className="tableItem">
            <p style={{ width: '10%' }} className="item_column">{i}</p>
            <p style={{ width: '20%' }} className="item_column">{data.to.username}</p>
            <p style={{ width: '20%' }} className="item_column opacity">{data.name}</p>
            <p style={{ width: '20%' }} className="item_column opacity">{data.join_data.slice(0, 10)}</p>
            <p style={{ width: '20%' }} className="item_column opacity">{data.complete_data.slice(0, 10)}</p>
            <div style={{ width: '10%' }} className="item_column" onClick={() => setModalStyle({ display: "flex" })}>
                <p className={data.status}>{data.status}</p>
            </div>
            <div className="status_modal" style={modalStyle}>
                <p className="free" onClick={(e) => changeStatus("free", e)}>free</p>
                <p className="pending" onClick={(e) => changeStatus("pending", e)}>pending</p>
                <p className="done" onClick={(e) => changeStatus("done", e)
                }>done</p>
            </div >
        </div >
    )
}