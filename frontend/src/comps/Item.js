import React from 'react'
import { useState } from 'react'

function Item(props) {

  const [done, setDone] = useState(props.done)
  const handleDone = () => {
    setDone(!done)
    props.handleDone({done: !done, itemId: props.id})
  }

  return (
    <div className='item' >
      <div className='item-stuff'>
        <button className="checkbox" onClick={() => handleDone()}>
          {done? "✅":"🔳"}
        </button>
        <span className={done ? 'item-done' : ''}>{props.text}</span>
      </div>
      <button className='delete' onClick={() => props.handleDelete(props.id)}>✖</button>
    </div>
  )
}

export default Item