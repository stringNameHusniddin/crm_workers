import Inp from "../components/notification/inp";
import Item from "../components/notification/item";
import Table from "../components/notification/table";

import { notification } from "../assets/constants/notification"

import "../style/notification.scss"

import { useEffect, useState } from "react";


export default function Notification() {
    const [id, setId] = useState(localStorage.getItem("n_id"))
    const [initialData, setIntialData] = useState(notification)
    const [data, setData] = useState([])

    useEffect(() => {
        setData(initialData.filter(item => item.to == parseInt(id)))
    }, [id, initialData])

    return <div className="n_layout">
        <div className="n_table">
            <Table setId={setId} />
        </div>
        <div className="messageInp">
            <div className="n_messages">
                {data.length > 0 ? data.map((item, i) => (
                    <Item  key={i += 1} message={item.message} />
                )) : <h1 className="pageName" style={{ margin: 0 }}>There is nothing</h1>}
            </div>
            <Inp data={initialData} setData={setIntialData} id={id}/>
        </div>
    </div>
}