import { Link } from "react-router-dom"
import { memo } from "react"

const SideBarItem = memo(function ({data}){

    const style = data.borderBottom ? {borderBottom:"1px dashed #55597D"}:null

    return(
        <div className="item" style={style}>
            <p className="title">{data.title}</p>
            <div className="link_wrapper">
                {data.items.map(mal=>(
                    <Link to={mal.to} className="link" key={mal.name}>
                        <img src={mal.icon} alt="" />
                        <p className="name">{mal.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
})

export default SideBarItem