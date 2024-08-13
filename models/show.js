const User = require('./user')

const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    title: { type: String, required: true},
    rating: { type: Number, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const Show = mongoose.model('Show', showSchema)

module.exports = Show



    

