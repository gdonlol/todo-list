import React from 'react'

function ErrorNotif(props) {
  
  if (props.msg !== ''){
    return (
      <div className="error-notif"><span>{props.msg}</span><button className="error-notif-close" onClick={props.handleClose}>×</button></div>
    )
  }else{
    return null
  }
  
}

export default ErrorNotif