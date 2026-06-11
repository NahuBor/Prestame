const session = require('express-session')
const dotenv = require('dotenv').config()
const MongoStore = require('connect-mongo').MongoStore
const mongoose = require('mongoose')

exports.sessionMiddleware = () => {
    console.log("MONGO_URI:", process.env.MONGO_URI)
    return session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
             mongoUrl: process.env.MONGO_URI,
            collection: 'sessions'
        }),
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60000 * 10
        }
    })
}

