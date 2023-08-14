import "../style/input.scss"

export default function Input({placeholder, type, setter}){
    return <input className="input" type={type} onChange={e=>setter(e.target.value)} placeholder={placeholder}/>
}