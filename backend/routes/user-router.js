const userRouter = require('express').Router()
const User = require("../models/user-model")
const List = require("../models/list-model")
const Item = require("../models/item-model")

//retrieve all existing lists ids and titles
userRouter.get('/:username/lists', async (request, response) => {
    console.log("GET LISTS: ", request.params.username)
    const user = await User.findOne({username: request.params.username})
        .populate({
            path: 'lists',
            select: 'title'
        })
    response.status(200).json({lists: user.lists})
})

//retrieve a list in detail
userRouter.get('/:username/lists/:listId', async (request, response) => {
    console.log("GET LIST DETAILS: ", request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    response.status(200).json(list)
})

//new list creation
userRouter.post('/:username/lists', async (request, response) => {
    console.log("POST LISTS: ", request.params.username)
    const user = await User.findOne({username: request.params.username})
    const newList = new List({author: user._id})
    user.lists.push(newList)
    await newList.save()
    await user.save()
    response.status(201).json(newList)
})

//list deletion
userRouter.delete('/:username/lists/:listId', async (request, response) => {
    console.log("DELETE LIST: ", request.params.username)
    const user = await User.findOne({username: request.params.username})
    const listId = request.params.listId
    await List.findByIdAndDelete(listId)
    user.lists = user.lists.filter(curr => {
        return curr._id.toString() !== listId
    })
    await user.save()
    response.status(204).end()
})

//list update
userRouter.put('/:username/lists/:listId', async (request, response) => {
    console.log('UPDATE LIST TITLE AND DESC: ', request.params.username)
    const newList = await List.findByIdAndUpdate(request.params.listId, request.body, {new: true}).populate('items')
    response.status(200).json(newList)
})

//new item to list
userRouter.post('/:username/lists/:listId/itemTransaction', async (request, response) => {
    console.log('NEW ITEMS: ', request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    const item = new Item({
        text: request.body.text,
    })
    await item.save()
    list.items.push(item)
    await list.save()
    response.status(201).json(list)
})

//delete item from list
userRouter.delete('/:username/lists/:listId/:itemId/itemTransaction', async (request, response) => {
    console.log('DELETE ITEM: ', request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    const id = request.params.itemId
    await Item.findByIdAndDelete(id)
    list.items = list.items.filter(curr => {
        return curr._id.toString() !== id
    })
    await list.save()
    response.status(201).json(list)
})

//update item
userRouter.put('/:username/lists/:listId/itemTransaction', async (request, response) => {
    console.log('UPDATE ITEM: ',request.params.username)
    console.log(request.body.done);
    const list = await Item.findById(request.body.itemId)
    list.done = request.body.done
    console.log(list)
    await list.save()
    const newList = await Item.findById(request.body.itemId)
    console.log(newList)
    response.status(200).json({done: list.done})
})

module.exports = userRouter