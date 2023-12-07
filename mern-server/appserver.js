const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

const createBookRouter = require('./routes/create_books')

const app = express()

app.use(bodyParser.json())
app.use(cors())
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}
app.use(cors(corsOption));

app.use('/api',createBookRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Application Server Running on - http://localhost:${PORT}`)
})
