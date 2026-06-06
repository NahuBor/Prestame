const dotenv = require('dotenv').config()

const dbConfig = {
    USER_DB: process.env.USER_DB,
    PASSWORD_DB: process.env.PASSWORD_DB,
    NAME_DB: process.env.NAME_DB,
}


module.exports = {dbConfig}

