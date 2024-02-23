const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false
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