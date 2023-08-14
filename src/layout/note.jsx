import Inp from "../components/note/inp";
import Item from "../components/note/item";
import "../style/notification.scss"

import { useEffect, useState } from "react";


export default function Note({notes, user, setNotes}) {
    const [data, setData] = useState(notes)
    useEffect(() => {
        setData(notes.filter(item => item.owner.id === user.id))
    }, [user, notes])

    //.filter(item => item.owner.id === user.id)
    console.log(data, notes);

    return <div className="n_layout notes_layout">
        <div className="messageInp">
            <div className="n_messages" style={{height:650, marginBottom:40}}>
                {data.length > 0 ? data.map((item, i) => (
                    <Item  key={i += 1} message={item.text} />
                )) : <h1 className="pageName" style={{ margin: 0 }}>There is nothing</h1>}
            </div>
            <Inp data={notes} setData={setNotes} id={user.id}/>
        </div>
    </div>
}