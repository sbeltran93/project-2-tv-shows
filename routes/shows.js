const express = require('express')
const router = express.Router()
const showCtrl = require('../controllers/shows')

// Index

// /shows
router.get('/', showCtrl.index)
// New

// /show/new
router.get('/new', showCtrl.newFunc)
// SignIn

router.get('/sign-in', showCtrl.showSignIn)

// Delete
router.delete('/:id', showCtrl.destroy)
// Update
router.put('/:id', showCtrl.update)
// Create
router.post('/', showCtrl.signUp)
// Sign In Functionality
router.post('/sign-in-show', showCtrl.signIn)
// Edit
router.get('/:id/edit', showCtrl.edit)
// Show
router.get('/:id', showCtrl.show)

module.exports = router