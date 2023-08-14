export default function({num, setter}){

    const changeIndexes=()=>{
        setter.setFirstIndex((num+1)*10-10)
        setter.setLastIndex((num+1)*10)
    }

    return <button onClick={changeIndexes} className="tab">{num+1}</button>
}   