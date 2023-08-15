import Head from "../components/dashboard/head";
import Item from "../components/dashboard/item";
import Tab from "../components/dashboard/tab";
import { useState, useEffect, Suspense } from "react";

import "../style/table.scss"

export default function Dashboard({ workers, currentUser, setUsers }) {
    const [int, setInt] = useState(1)
    const [remains, setRemains] = useState(1)
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(10)
    const [works, setWorks] = useState([])
    const [data, setData] = useState([])
    const [tabs, setTabs] = useState([])
    const [myWorks, setMyworks] = useState(false)

    let array = []

    useEffect(() => {
        const length = works.length
        setRemains(length % 10)
        if (remains > 0) setInt(length / 10 + 1)
        else setInt(length / 10)
    }, [works, int, myWorks])

    useEffect(() => {
        if (currentUser.role === 'director') {
            workers.map(worker => {
                if (worker.role !== "director") {
                    worker.works.map(work => {
                        array.push(work)
                    })
                    setWorks(array)
                }
            })
        } else if (currentUser.role === "worker") {
            currentUser.works.map(work => {
                array.push(work)
            })
            setWorks(array)
        } else if (currentUser.role === "boss") {
            if (myWorks === false) {
                workers.map(worker => {
                    if (worker.boss_id === currentUser.id && worker.role === "worker") {
                        worker.works.map(work => {
                            array.push(work)
                        })
                        setWorks(array)
                    }
                })
            } else {
                currentUser.works.map(work => {
                    array.push(work)
                })
                setWorks(array)
            }
        } else if (currentUser.role === "pre_director") {
            if (myWorks === false) {
                workers.map(worker => {
                    if (worker.role !== "director" && worker.id !== currentUser.id) {
                        worker.works.map(work => {
                            array.push(work)
                        })
                        setWorks(array)
                    }
                })
            } else {
                currentUser.works.map(work => {
                    array.push(work)
                })
                setWorks(array)
            }
        }
    }, [workers, myWorks])

    useEffect(() => {
        setData(works.slice(firstIndex, lastIndex))
        setTabs([...Array(parseInt(int)).keys()])
    }, [works, firstIndex, lastIndex, int, myWorks])
    return (
        <div>
            <h1 className="pageName">Dashboard</h1>
            {currentUser.role === "boss" || currentUser.role === "pre_director" ? <>
                <button className="changeData" onClick={() => setMyworks(!myWorks)}>{myWorks ? "Other" : "My works"}</button>
            </> : null}
            <Head />
            <div style={{ height: 510 }}>
                <Suspense fallback={"loding..."}>
                    {
                        data.map((mal, i) => (
                            <Item user={currentUser} setWorks={setWorks} works={works} key={i += 1} data={mal} i={i += 1} setUsers={setUsers}/>
                        ))
                    }
                </Suspense>
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
        </div>
    )
}