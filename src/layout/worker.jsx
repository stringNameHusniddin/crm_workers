import Head from "../components/workers/head";
import Item from "../components/workers/item";
import Tab from "../components/workers/tab";

import "../style/table.scss"

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Worker({ workers, currentUser }) {
    const [int, setInt] = useState(1)
    const [remains, setRemains] = useState(1)
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(10)
    const [data, setData] = useState([])
    const [tabs, setTabs] = useState([])
    const [permission, setPermission] = useState(true)
    const [workers_, setWorkers_] = useState([])

    let array = []

    useEffect(() => {
        const length = workers_.length
        setRemains(length % 10)
        if (remains > 0) setInt(length / 10 + 1)
        else setInt(length / 10)    
    }, [workers_])

    useEffect(() => {
        if (currentUser.role === "worker") {
            setPermission(false)
        } else if (currentUser.role === "boss") {
            workers.map(worker => {
                if (worker.role === "worker" && worker.boss_id === currentUser.id) {
                    array.push(worker)
                }
                setWorkers_(array)
            })
        } else if (currentUser.role === "director") {
            workers.map(worker => {
                if (worker.role !== "director") {
                    array.push(worker)
                }
                setWorkers_(array)
            })
        } else if (currentUser.role === "pre_director") {
            workers.map(worker => {
                if (worker.role !== "director" && worker.role !== "pre_director") {
                    array.push(worker)
                }
                setWorkers_(array)
            })
        }
    }, [workers, int])

    useEffect(() => {
        setData(workers_.slice(firstIndex, lastIndex))
        setTabs([...Array(parseInt(int)).keys()])
    }, [workers_, workers, firstIndex, lastIndex, int])

    return (
        <>{
            permission ? <div>
                <div className="employes_header">
                    <h1 className="pageName">Employes</h1>
                    <Link to='/add workers'>Add employee</Link>
                </div>
                <Head />
                <div style={{ height: 510 }}>
                    {
                        data.map((mal, i) => (
                            <Item setWorkers={setWorkers_} workers={workers_} key={i += 1} data={mal} i={i += 1} />
                        ))
                    }
                </div>
                <div className="tabs">
                    {
                        tabs.map(mal => (
                            <Tab key={mal} num={mal} setter={
                                {
                                    setLastIndex: setLastIndex,
                                    setFirstIndex: setFirstIndex
                                }
                            } />
                        ))
                    }
                </div>
            </div> : <h1 className="pageName">You haven't permission</h1>
        }</>
    )
}