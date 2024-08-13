// Community page/login

const {model, Schema} = require('mongoose')

const userSchema = new Schema ({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    posts: [{type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }]
      
    })

const User = model('User', userSchema)

module.exports = User