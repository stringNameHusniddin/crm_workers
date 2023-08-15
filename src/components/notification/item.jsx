import icon from "../../assets/icon/qungiroq.svg"

export default function Item({text}){
    return(
        <div className="n_message">
            <img src={icon} alt="" />
            <p>{text}</p>
        </div>
    )
}