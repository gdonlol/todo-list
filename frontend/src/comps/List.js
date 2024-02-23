function List(props) {
  return (
    <div className='clickable' tabIndex='0' onClick={() => props.listSwitchFn(props.id)}>
        <div className='btn-text'  style={{ color: "#9B9B9B"}}>
            <p>🔹 {props.title}</p>
        </div>
        <button
          className='delete'
          onClick={e => props.deleteListFn(e, props.id)}
          style={{
            width: '20px',
            height: '20px',
            fontSize: '10px'
          }}>
          ✖
        </button>
    </div>
  )
}

export default List