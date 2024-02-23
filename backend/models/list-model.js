const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "A Todo List"
    },
    desc:{
        type: String,
        default: "Just a humble little todo list :)"
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
})
listSchema.set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
})

module.exports = mongoose.model('List', listSchema)