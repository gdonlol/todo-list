import {useState, useEffect} from 'react'
import "./App.css";
import Sidebar from "./comps/Sidebar";
import Header from "./comps/Header";
import Content from "./comps/Content";
import InputBar from "./comps/InputBar";
import userService from './service/user-service';

function App() {
  //states
  const user = JSON.parse(window.localStorage.getItem('localUser'))
  const [lists, setLists] = useState([])
  const [list, setList] = useState(null)

  //LIST STUFF
  const fetchAllLists = async () => {
    try{
      setLists(await userService.getAllLists(user.username, user.token))
    }catch(e){
      alert(e.response.data.error);
    }
  }
  const listSwitchFn = async (id) => {
    try{
      setList(await userService.getListContent(user.username, id, user.token))
    }catch(e){
      alert(e.response.data.error)
    }
  }
  const addListFn = async () => {
    try{
      setList(await userService.addList(user.username, user.token))
      setLists(await userService.getAllLists(user.username, user.token))
    }catch(e){
      alert(e.response.data.error)
    }
  }
  const deleteListFn = async (e, id) => {
    e.stopPropagation();
    try{
      await userService.deleteList(user.username, id, user.token)
      setLists(await userService.getAllLists(user.username, user.token))
      setList(null)
    }catch(e){
      alert(e.response.data.error)
    }
  }

  //TITLE AND DESC EDITING
  const handleTitleFn = async (value) => {
    try{
      setList(await userService.updateList(user.username, list.id, {title: value}, user.token))
      fetchAllLists()
    }catch(e){
      alert(e.response.data.error)
    }
  }
  const handleDescFn = async (value) => {
    try{
      setList(await userService.updateList(user.username, list.id, {desc: value}, user.token))
      fetchAllLists()
    }catch(e){
      alert(e.response.data.error)
    }
  }
  
  //ITEM TRANSACTIONS
  const handleDone = async (newData) => {
    try{
      const response = await userService.changeItem(user.username, list.id, newData, user.token)
      return response.done
    }catch(e){
      alert(e.response.data.error)
    }
  }
  const handleAdd = async (textData) => {
    if (list === null){
      return
    }
    try{
      setList(await userService.addItem(user.username, list.id, {text: textData}, user.token))
    }catch(e){
      alert(e.response.data.error)
    }
  }
  const handleDelete = async (id) => {
    try{
      setList(await userService.deleteItem(user.username, list.id, id, user.token))
    }catch(e){
      alert(e.response.data.error)
    }
  }

  //USE EFFECT
  useEffect(() => {
    fetchAllLists()
  }, [])

  //checks if user token is saved in local storage
  if (user === null){
    return window.location.replace('/signup')
  }

  return (
  <div className='app'>
    <Sidebar
      lists={lists}
      listSwitchFn={listSwitchFn}
      addListFn={addListFn}
      deleteListFn={deleteListFn}
    />
    <div className='main'>
      <Header list={list} username={user.username} />
      <Content 
        list={list}
        handleTitleFn={handleTitleFn}
        handleDescFn={handleDescFn}
        handleDone={handleDone}
        handleDelete={id => handleDelete(id)}
      />
      <InputBar handleAdd={t => handleAdd(t)} />
    </div>
  </div>
  
  )
}

export default App;