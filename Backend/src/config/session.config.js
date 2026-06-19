const session = require('express-session')
const dotenv = require('dotenv').config()
const MongoStore = require('connect-mongo').MongoStore
const mongoose = require('mongoose')

exports.sessionMiddleware = () => {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collection: 'sessions'
        }),
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60000 * 10
        }
    })
}

