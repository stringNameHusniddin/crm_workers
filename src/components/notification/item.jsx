import icon from "../../assets/icon/qungiroq.svg"

export default function Item({message}){
    return(
        <div className="n_message">
            <img src={icon} alt="" />
            <p>{message}</p>
        </div>
    )
}