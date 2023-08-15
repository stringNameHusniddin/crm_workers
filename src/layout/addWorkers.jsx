import { useEffect, useState } from "react";
import Input from "../components/inp";
import { useNavigate } from "react-router-dom";

export default function AddWorkers({ users, user, setUsers, permission }) {
    const [name, setName] = useState("")
    const [surName, setSurName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [role, setRole] = useState("worker")
    const [bosses, setBosses] = useState([])
    const [bossId, setBossId] = useState(0)
    const [joinedDate, setJoinedDate] = useState("")
    const [password, setPassword] = useState("")
    const [roles, setRoles] = useState(["worker"])

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    let array_bosses = []

    useEffect(() => {
        if (user.role === "pre_director") {
            setRoles(["worker", "boss"])
        } else if (user.role === "director") {
            setRoles(["worker", "boss", "pre_director"])
        } else if (user.role === "boss") {
            setRoles(["worker"])
        }

        if (role === "worker") {
            users.map(user_ => {
                if (user_.role === "boss") {
                    array_bosses.push(user_)
                }
                setBosses(array_bosses)
            })
        }
    }, [users])

    useEffect(() => {
        if (bosses.length > 0) {
            setBossId(bosses[0].id)
        }
    }, [bosses])

    function send_data() {
        if (name !== "" && surName !== "" && age !== 0 && bossId !== 0, password !== "") {
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role,
                    username: name,
                    password: password,
                    first_name: name,
                    last_name: surName,
                    join_data: joinedDate,
                    status: "free",
                    age,
                    email,
                    boss_id: bossId
                })
            }

            fetch("https://crm-5l3k.onrender.com/user", options).then(
                res => res.json()
            ).then(
                () => {
                    fetch("https://crm-5l3k.onrender.com/user", {
                        headers: {
                            "Authorization": `Bearer ${JSON.parse(token).access_token}`,
                            "Content-Type": "application/json",
                        }
                    }).then(res => res.json()).then(json => setUsers(json))
                    setBosses([])
                    navigate("/workers")
                }
            )
        }
    }

    return <>{
        permission ? <div>
            <h1 h1 className="pageName" > Add Employee</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginTop: 50 }}>
                <Input placeholder={"Name"} type={"text"} setter={setName} />
                <Input placeholder={"Surname"} type={"text"} setter={setSurName} />
                <Input placeholder={"Age"} type={"number"} setter={setAge} />
                <Input placeholder={"Email"} type={"email"} setter={setEmail} />
                <Input placeholder={"joined date"} type={"date"} setter={setJoinedDate} />
                <Input placeholder={"Password"} type={"password"} setter={setPassword} />
                <select className="select" onChange={e => setRole(e.target.value)}>
                    {
                        roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))
                    }
                </select>
                {role === "worker" ? <select className="select" onChange={e => setBossId(e.target.value)}>
                    {
                        bosses.map(boss => (
                            <option key={boss.username} value={boss.id}>{boss.username}</option>
                        ))
                    }
                </select> : null}
                <button onClick={send_data} className="btnSend">Add</button>
            </div>
        </div > : null
    }</>
}