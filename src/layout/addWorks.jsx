import { useEffect, useState } from "react";
import "../style/input.scss"
import Input from "../components/inp";
import { useNavigate } from "react-router-dom";

export default function AddWorks({ users, user, setUsers, permission }) {
    const [name, setName] = useState("")
    const [joinedDate, setJoinedDate] = useState("")
    const [doneDate, setDoneDate] = useState("")
    const [workers, setWorkers] = useState([])
    const [to, setTo] = useState(0)

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    let array = []

    useEffect(() => {
        setWorkers(users)
        if (user.role === "director") {
            users.map(user_ => {
                if (user_.role !== "director") {
                    array.push(user_)
                }
                setWorkers(array)
            })
        } else if (user.role === "pre_director") {
            users.map(user_ => {
                if (user_.role !== "director" && user_.role !== "pre_director") {
                    array.push(user_)
                }
                setWorkers(array)
            })
        } else if (user.role === "boss") {
            users.map(user_ => {
                if (user_.boss_id === user.id && user_.role === "worker") {
                    array.push(user_)
                }
                setWorkers(array)
            })
        }
    }, [users])

    useEffect(() => {
        setTo(workers.length > 0 ? workers[0].id : null)
    }, [workers])

    function send_data() {
        if (doneDate !== "" && name !== "" && joinedDate !== "" && to !== 0) {
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    join_data: joinedDate,
                    complete_data: doneDate,
                    status: "free",
                    to_id: to,
                    owner_id: user.id
                })
            }

            fetch("http://127.0.0.1:8000/work", options).then(
                res => res.json()
            ).then(
                () => {
                    fetch("http://127.0.0.1:8000/user", {
                        headers: {
                            "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                            "Content-Type": "application/json",
                        }
                    }).then(res => res.json()).then(json => {
                        setUsers(json)
                        navigate("/")
                    })
                }
            )
        }
    }

    console.log(to);

    return <>{
        permission ? <div>
            <h1 className="pageName">Add Works</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50, marginTop: 50 }}>
                <Input placeholder={"Name"} type={"text"} setter={setName} />
                <Input placeholder={"Name"} type={"date"} setter={setJoinedDate} />
                <Input placeholder={"Name"} type={"date"} setter={setDoneDate} />
                <select className="select" onChange={e => setTo(e.target.value)}>
                    {
                        workers.map(worker => (
                            <option key={worker.id} value={worker.id}>{worker.username}</option>
                        ))
                    }
                </select>
                <button onClick={send_data} className="btnSend">Add</button>
            </div>
        </div> : <h1 className="pageName">You haven't permission</h1>
    }</>
}