import Item from "./Item"

const Content = (props) => {

    if (props.list === null){
        return(
        <div className='content'>
            <h1>👋 Welcome to your TodoList app!</h1>
            <p>👈 It looks like you haven't selected a list yet. To get started, simply click on one of the lists in the sidebar to view its contents.</p>
            <p>Once you've selected a list, you'll see all the tasks you've added. You can add new tasks, mark them as completed, or edit them right here.</p>
            <i>Happy organizing!</i>
        </div>
        )
    }

    const renderList = props.list.items.map(curr => {
        return <Item 
            key={curr.id}
            id={curr.id}
            text={curr.text}
            done={curr.done}
            handleDone={props.handleDone}
            handleDelete={id => props.handleDelete(id)}
        />
    })

    return(
        <div className='content'>
            <h1
                contentEditable='true'
                suppressContentEditableWarning={true}
                className='editable'
                onBlur={e => props.handleTitleFn(e.target.textContent)}>
                {props.list.title}
            </h1>
            <p
                contentEditable='true'
                suppressContentEditableWarning={true}
                className='editable'
                onBlur={e => props.handleDescFn(e.target.textContent)}
                style={{opacity: 0.81}}>
                {props.list.desc}
            </p>
            <div className="line"></div>
            {
                props.list.items.length === 0 
                    ? <i>Your list is empty! Add an item in the search bar below 👇</i>
                    :renderList
            }
            
        </div>
    )
}

export default Content