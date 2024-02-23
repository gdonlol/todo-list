const Header = (props) => {
    return (
    <div className='header'>
        <p>{props.list === null ? "Home" : props.list.title}</p>
        <p>👤 {props.username}</p> 
    </div>
    )
}

export default Header