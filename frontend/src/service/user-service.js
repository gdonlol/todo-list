import axios from "axios"
const baseUrl = "/api/user"

const getAllLists = async (username) => {
    const response = await axios.get(`${baseUrl}/${username}/lists`)
    return response.data.lists
}

const getListContent = async (username, listId) => {
    const response = await axios.get(`${baseUrl}/${username}/lists/${listId}`)
    return response.data
}

const addList = async (username) => {
    const response = await axios.post(`${baseUrl}/${username}/lists`)
    return response.data
}

const deleteList = async (username, listId) => {
    const response = await axios.delete(`${baseUrl}/${username}/lists/${listId}`)
    return response.data
}

const updateList = async (username, listId, data) => {
    const response = await axios.put(`${baseUrl}/${username}/lists/${listId}`, data)
    return response.data
}

const changeItem = async (username, listId, data) => {
    const response = await axios.put(`${baseUrl}/${username}/lists/${listId}/itemTransaction`, data)
    return response.data
}

const addItem = async (username, listId, data) => {
    const response = await axios.post(`${baseUrl}/${username}/lists/${listId}/itemTransaction`, data)
    return response.data
}

const deleteItem = async (username, listId, itemId) => {
    console.log(itemId)
    const response = await axios.delete(`${baseUrl}/${username}/lists/${listId}/${itemId}/itemTransaction`)
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