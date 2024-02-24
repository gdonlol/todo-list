const userRouter = require('express').Router()
const User = require("../models/user-model")
const List = require("../models/list-model")
const Item = require("../models/item-model")
const middleware = require("../middleware")

//retrieve all existing lists ids and titles
userRouter.get('/:username/lists', middleware.userExtractor, async (request, response) => {
    console.log("GET LISTS: ", request.params.username)
    response.status(200).json({lists: request.user.lists})
})

//retrieve a list in detail
userRouter.get('/:username/lists/:listId', middleware.userExtractor, async (request, response) => {
    console.log("GET LIST DETAILS: ", request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    if (request.user._id.equals(list.author)){
        return response.status(200).json(list)
    }
    response.status(401).json({error: "Unauthorized access."})
})

//new list creation
userRouter.post('/:username/lists', middleware.userExtractor, async (request, response) => {
    console.log("POST LISTS: ", request.params.username)
    const user = request.user
    if (user.lists.length >= 10){
        return response.status(400).json({error: "You have too many lists on this account."})
    }
    const newList = new List({author: user._id})
    user.lists.push(newList)
    await newList.save()
    await user.save()
    response.status(201).json(newList)
})

//list deletion
userRouter.delete('/:username/lists/:listId', middleware.userExtractor, async (request, response) => {
    console.log("DELETE LIST: ", request.params.username)
    const user = request.user
    const listId = request.params.listId
    const list = await List.findById(listId)

    list.items.forEach(async (curr) => {
        await Item.findByIdAndDelete(curr.toString())
    })
    await List.findByIdAndDelete(listId)
    user.lists = user.lists.filter(curr => {
        return curr._id.toString() !== listId
    })
    await user.save()
    response.status(204).end()
})

//list update
userRouter.put('/:username/lists/:listId', middleware.userExtractor, async (request, response) => {
    console.log('UPDATE LIST TITLE AND DESC: ', request.params.username)
    const list = await List.findById(request.params.listId)
    if (request.user._id.equals(list.author)){
        const newList = await List.findByIdAndUpdate(request.params.listId, request.body, {new: true}).populate('items')
        return response.status(200).json(newList)
    }
    response.status(401).json({error: "Unathorized access."})
})

//new item to list
userRouter.post('/:username/lists/:listId/itemTransaction', middleware.userExtractor, async (request, response) => {
    console.log('NEW ITEMS: ', request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    if (!request.user._id.equals(list.author)){
        return response.status(401).json({error: "Unathorized access."})
    }
    if (list.items.length >= 50){
        return response.status(400).json({error: "You have too many items on this list."})
    }
    const item = new Item({
        text: request.body.text,
        author: request.user
    })
    await item.save()
    list.items.push(item)
    await list.save()
    response.status(201).json(list)
})

//delete item from list
userRouter.delete('/:username/lists/:listId/:itemId/itemTransaction', middleware.userExtractor, async (request, response) => {
    console.log('DELETE ITEM: ', request.params.username)
    const list = await List.findById(request.params.listId).populate('items')
    if (!request.user._id.equals(list.author)){
        return response.status(401).json({error: "Unathorized access."})
    }
    const id = request.params.itemId
    await Item.findByIdAndDelete(id)
    list.items = list.items.filter(curr => {
        return curr._id.toString() !== id
    })
    await list.save()
    response.status(201).json(list)
})

//update item
userRouter.put('/:username/lists/:listId/itemTransaction', middleware.userExtractor, async (request, response) => {
    console.log('UPDATE ITEM: ',request.params.username)
    const item = await Item.findById(request.body.itemId)
    if (!request.user._id.equals(item.author)){
        return response.status(401).json({error: "Unathorized access."})
    }
    item.done = request.body.done
    await item.save()
    await Item.findById(request.body.itemId)
    response.status(200).json({done: item.done})
})

module.exports = userRouter