const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is missing'],
        minLength: [3, 'Username must be a minimum length of 3.'],
        maxLength: [15, 'Username must be a maximum length of 15.'],
        unique: [true, 'Username is taken.'],
        validate: {
            validator: (input) => {
                return /^[a-zA-Z0-9_-]+$/.test(input)
            },
            message: 'Username must be alphanumeric, dashes, underscores only.'
        }
    },
    passwordHash: String,
    lists: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "List"
        }],
        default: []
    }
})
userSchema.set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.passwordHash;
    },
})
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)