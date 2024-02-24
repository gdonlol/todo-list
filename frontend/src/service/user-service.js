import axios from "axios"
const baseUrl = "/api/user"

const getAllLists = async (username, token) => {
    const response = await axios.get(
        `${baseUrl}/${username}/lists`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data.lists
}

const getListContent = async (username, listId, token) => {
    const response = await axios.get(
        `${baseUrl}/${username}/lists/${listId}`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const addList = async (username, token) => {
    const response = await axios.post(
        `${baseUrl}/${username}/lists`, {},
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const deleteList = async (username, listId, token) => {
    const response = await axios.delete(
        `${baseUrl}/${username}/lists/${listId}`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const updateList = async (username, listId, data, token) => {
    const response = await axios.put(
        `${baseUrl}/${username}/lists/${listId}`,
        data,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const changeItem = async (username, listId, data, token) => {
    const response = await axios.put(
        `${baseUrl}/${username}/lists/${listId}/itemTransaction`,
        data,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const addItem = async (username, listId, data, token) => {
    const response = await axios.post(
        `${baseUrl}/${username}/lists/${listId}/itemTransaction`,
        data,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const deleteItem = async (username, listId, itemId, token) => {
    console.log(itemId)
    const response = await axios.delete(
        `${baseUrl}/${username}/lists/${listId}/${itemId}/itemTransaction`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return response.data
}

const userService ={
    getAllLists,
    getListContent,
    addList,
    deleteList,
    updateList,
    changeItem,
    addItem,
    deleteItem
} 
export default userService