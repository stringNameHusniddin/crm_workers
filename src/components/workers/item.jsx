import { useState } from "react";

export default function Item({ data, i, workers, setWorkers }) {

    const [modalStyle, setModalStyle] = useState({
        display: "none"
    })

    const token = localStorage.getItem("token")

    function changeStatus(status, e) {
        e.stopPropagation();
        const new_workers = workers.map(worker => {
            if (worker.id === data.id) {
                return {
                    ...worker,
                    status
                }
            }
            return worker
        })
        setModalStyle({
            display: "none"
        })
        send_data(status, data.id)
        setWorkers(new_workers)
    }
    function send_data(status, id) {

        const options = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: data.role,
                username: data.username,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                join_data: data.join_data,
                status: status,
                age: data.age,
                email: data.email,
                boss_id: data.boss_id,
                id:data.id
            })
        }

        fetch(`http://127.0.0.1:8000/user/${data.id}`, options)
    }


    return (
        <div className="tableItem">
            <p style={{ width: '10%' }} className="item_column">{i}</p>
            <p style={{ width: '20%' }} className="item_column">{data.username}</p>
            <p style={{ width: '10%' }} className="item_column">{data.age}</p>
            <p style={{ width: '20%' }} className="item_column opacity">{data.join_data.slice(0, 10)}</p>
            <div style={{ width: '10%' }} className="item_column" onClick={() => setModalStyle({ display: "flex" })}>
                <p className={data.status}>{data.status}</p>
            </div>
            <p style={{ width: '30%' }} className="item_column">{data.email}</p>
            <div className="status_modal" style={modalStyle}>
                <p className="free" onClick={(e) => changeStatus("free", e)}>free</p>
                <p className="pending" onClick={(e) => changeStatus("pending", e)}>pending</p>
                <p className="done" onClick={(e) => changeStatus("done", e)
                }>done</p>
            </div >
        </div>
    )
}