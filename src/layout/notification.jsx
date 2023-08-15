import Inp from "../components/notification/inp";
import Item from "../components/notification/item";
import Table from "../components/notification/table";
import "../style/notification.scss"

import { useEffect, useState } from "react";


export default function Notification({ users, user, setUsers }) {
    const [id, setId] = useState()
    const [data, setData] = useState([])
    const [workers, setWorkers] = useState([])
    const array = []
    const array2 = []

    useEffect(() => {
        if (user.role === "boss") {
            users.map(worker => {
                if (worker.role === "worker" && worker.boss_id === user.id) {
                    array.push(worker)
                }
            })
            setWorkers(array)
        } else if (user.role === "director") {
            users.map(worker => {
                if (worker.role !== "director") {
                    array.push(worker)
                }
            })
            setWorkers(array)
        }
    }, [users])

    useEffect(() => {
        if (workers.length > 0) {
            setId(localStorage.getItem("user_id"))
        }
    }, [workers])

    useEffect(() => {
        if (workers.length > 0) {
            workers.map(worker => {
                if (worker.id === parseInt(id)) {
                    worker.notifications.map(mal => {
                        array2.push(mal)
                    })
                }
            })
            setData(array2)
        }
    }, [id])

    return <div className="n_layout">
        <div className="n_table">
            <Table setId={setId} users={workers} />
        </div>
        <div className="messageInp">
            <div className="n_messages">
                {data.length > 0 ? data.map((item, i) => (
                    <Item key={i += 1} text={item.text} />
                )) : <h1 className="pageName" style={{ margin: 0 }}>There is nothing</h1>}
            </div>
            <Inp user={user} setUsers={setUsers} id={id} />
        </div>
    </div>
}