const Show = require('../models/show')
const bcrypt = require('bcrypt')



const signUp = async(req, res) => {
    try {
        const emailTaken = await Show.findOne({ email: req.body.email })
        if(emailTaken) return res.send('Email is taken')

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
        await Show.create(req.body).then(() => res.redirect('/shows/sign-in'))
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const signIn = async(req, res) => {
    try {
        const showExists = await Show.findOne({ email: req.body.email })
        if(!showExists) throw new Error('TV Show Not Found')

        const validPassword = bcrypt.compareSync(req.body.password, showExists.password)
        if(!validPassword) throw new Error('Login Failed')

        req.session.user = {
            email: showExists.email,
            _id: showExists._id
        }

        res.redirect('/users')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const index = async (req, res) => {
    try {
        const foundShows = await Show.find({})
        res.render('shows/index.ejs', {
            shows: foundShows
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const newFunc = (req, res) => {
  res.render('shows/new.ejs')
}
const showSignIn = (req, res) => {
    res.render('shows/signin.ejs')
  }

const destroy = async (req, res) => {
    try {
        const deletedShow = await Show.findOneAndDelete({ _id: req.params.id })
        deletedShow.posts.forEach((post) => {
            post.deleteOne()
        })
        deletedShow.comments.forEach((comment)=> {
            comment.deleteOne()
        })
        res.redirect('/shows')
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updatedShow = await Show.findOneAndUpdate({ _id: req.params.id }, req.body, { new : true })
        res.redirect(`/shows/${updatedShow._id}`)        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// const create = async (req, res) => {
//     try {
//         const createdAuthor = await Author.create(req.body)
//         res.redirect(`/authors/${createdAuthor._id}`)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }

const edit = async (req, res) => {
    try {
        const foundShow = await Show.findOne({ _id: req.params.id })
        res.render('shows/edit.ejs', {
            show: foundShow
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundshow = await Show.findOne({ _id: req.params.id }).populate('posts comments')
        console.log(foundShow)
        res.render('shows/show.ejs', {
            author: foundAuthor
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    index,
    newFunc,
    destroy,
    update,
    signUp,
    signIn,
    showSignIn,
    edit,
    show
}