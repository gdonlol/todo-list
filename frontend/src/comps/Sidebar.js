import List from "./List"

const Sidebar = (props) => {

  const renderLists = props.lists.map(curr => {
    return <List
      key={curr.id}
      listSwitchFn={props.listSwitchFn}
      deleteListFn={(e, id) => props.deleteListFn(e, id)}
      title={curr.title}
      id={curr.id}
    />
  })

  return(
  <div className='sidebar'>
    <div className='utils-container'>
      {/* Title Div */}
      <button className='clickable' style={{height: "37px"}}>
        <div className='btn-text' style={{ color: "#FFF"}}>
          <p className='emoji'>📋</p>
          <p>My Todo Lists</p>
        </div>
      </button>

      {/* User Div */}
      <button className='clickable' 
        onClick={() => {
          localStorage.clear()
          window.location.replace('/login')
        }}>
        <div className='btn-text' style={{ color: "#9B9B9B"}}>
          <p>Sign out</p>
        </div>
      </button>
    </div>

    <div className='lists-container'>   

      {renderLists}

      <button className='clickable' onClick={props.addListFn}>
        <div className='btn-text' style={{ color: "#9B9B9B"}}>
          <p>+ Add a list</p>
        </div>
      </button>
    </div>
  </div>
  )
}

export default Sidebar