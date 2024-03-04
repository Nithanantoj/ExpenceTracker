const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./schema.js')

//console.log('hello')

//console.log('hello anto')

const app = express()
app.use(bodyParser.json())
/**
 * git clone <link>
 * add (.gitignore file)
 * 
 * git add . / git add <filename>.<extesion>
 * 
 * git commit -m "<commit message>"
 * 
 * git push origin main
 * 
 * git config --global user.name 'username'
 * git config --global user.email emailid
 */

async function connectToDb() {
   await mongoose.connect('mongodb+srv://nithanantoj2022cse:anto2022cse@cluster0.ua76ums.mongodb.net/ExpenceTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connection established :)')
    const port = 9000

    app.listen(port, function () {
        console.log(`listening on port ${port}....`)
    })
}
connectToDb()

app.post('/add-expense', function(request, response) {
    console.log(request.body)
    response.json({
        "status" : "created"
    })
})

