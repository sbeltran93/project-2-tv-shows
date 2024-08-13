const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = ('express');
const mongoose = ('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
// const session = require('express-session');
const authController = require('./controllers/auth.js');
const showsController = require('./controllers/shows.js');
const usersController = require('./controllers/users.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const letUserView = require('./middleware/let-user-view.js');

const port = process.env.PORT ? process.env.PORT : 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
    console.log('MongoDB is up and running')
})

mongoose.connection.on('connected', () => {
    console.log(`MongoDB is connected it ${mongoose.connection.name}.`)
});

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(letUserView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users', usersController);
app.use('/users/:userId/shows', showsController);

app.get('/' , (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    })
})



app.use('/auth', authController);

app.listen(port, () => {
    console.log(`Express app is listening on ${port}`);
})