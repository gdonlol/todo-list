const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: [100, "Item text is too long"]
    },
    done: {
        type: Boolean,
        default: false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
})
itemSchema.set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
})

module.exports = mongoose.model('Item', itemSchema)