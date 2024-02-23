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
    setLists(await userService.getAllLists(user.username))
  }
  const listSwitchFn = async (id) => {
      setList(await userService.getListContent(user.username, id))
  }
  const addListFn = async () => {
    setList(await userService.addList(user.username))
    setLists(await userService.getAllLists(user.username))
  }
  const deleteListFn = async (e, id) => {
    e.stopPropagation();
    await userService.deleteList(user.username, id)
    setLists(await userService.getAllLists(user.username))
    setList(null)
  }

  //TITLE AND DESC EDITING
  const handleTitleFn = async (value) => {
    setList(await userService.updateList(user.username, list.id, {title: value}))
    fetchAllLists()
  }
  const handleDescFn = async (value) => {
    setList(await userService.updateList(user.username, list.id, {desc: value}))
    fetchAllLists()
  }
  
  //ITEM TRANSACTIONS
  const handleDone = async (newData) => {
    const response = await userService.changeItem(user.username, list.id, newData)
    return response.done
  }
  const handleAdd = async (textData) => {
    if (list === null){
      return
    }
    setList(await userService.addItem(user.username, list.id, {text: textData}))
  }
  const handleDelete = async (id) => {
    setList(await userService.deleteItem(user.username, list.id, id))
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