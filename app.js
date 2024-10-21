const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const port = 5000

// Local Middleware
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Library Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use(express.json())

// Routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// Initialize Server
const serverInit = async () => {
    try {
            await connectDB()
            console.log('Connected to Mongo')
            app.listen(port, () => console.log(`Server running on port ${port}`))
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
        }
}
serverInit()