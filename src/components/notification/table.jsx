import { users } from "../../assets/constants/users"

export default function Table({setId}){

    const setToLocalStorage=(id)=>{
        localStorage.setItem("n_id", id)
        setId(id)
    }

    return(
        <div>
            <div className="n_head">
                <p style={{width:"10%"}} className="head_column">No</p>
                <p style={{width:"90%"}} className="head_column">Name</p>
            </div>
            <div className="n_items">
                {users.map((item, i)=>(
                    <div style={{cursor:"pointer"}} key={i+=1} onClick={()=>setToLocalStorage(item.id)} className="n_item">
                        <p style={{width:"10%"}} className="item_column">{i+=1}</p>
                        <p style={{width:"90%"}} className="item_column">{item.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}