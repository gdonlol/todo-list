import { useState } from "react"

const InputBar = (props) => {

    const [textData, setTextData] = useState('')
    const handleAdd = (e) => {
        e.preventDefault()
        props.handleAdd(textData)
        setTextData('')
    }

    return(
        <div className='input-container'>
            <form className='input-bar' onSubmit={e => handleAdd(e)}>
                <input 
                    type="text"
                    value={textData}
                    onChange={(e) => setTextData(e.target.value)}
                    className='item-input'/>
                <button className='item-input-btn'/> 
            </form>
            {/* <small>Free app, funded by me. Donations accepted <u>here</u> :)</small> */}
        </div>
    )
}

export default InputBar