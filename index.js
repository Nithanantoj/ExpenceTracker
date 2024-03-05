const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./schema.js')

//console.log('hello')

//console.log('hello anto')

const app = express()
app.use(bodyParser.json())
app.use(cors())
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
    try{
        await mongoose.connect('mongodb+srv://nithanantoj2022cse:anto2022cse@cluster0.ua76ums.mongodb.net/ExpenceTracker?retryWrites=true&w=majority&appName=Cluster0')
            console.log('DB connection established :)')
            const port = process.env.port || 9000

            app.listen(port, function () {
                console.log(`listening on port ${port}....`)
            })
    }catch(error){
        console.log(error)
        console.log('couldn\'t establish the connection')
    }
}
connectToDb()

app.post('/add-expense', async function(request, response) {

    try{
        await Expense.create({
            "amount" : request.body.amount,
            "category" : request.body.category,
            "date" : request.body.date
        })

        

        response.status(201).json({
            "status" : "success",
            "message" : "new entry created"
        })
    }
    catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
    // console.log(request.body)
    // response.json({
    //     "status" : "created"
    // })
})

app.get('/get-expense', async function (request,response) {
    try{
        const expesesData = await Expense.find()
        response.status(201).json(expesesData)
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})

app.delete('/delete-expense/:id',async function (request,response) {
    try{
        const expenseData = await Expense.findById(request.params.id)
        if(expenseData){
            await Expense.findByIdAndDelete(request.params.id)

            response.status(200).json({
                "status" : "success",
                "message" : "entry deleted"
            })
        }
        else{
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})

app.patch('/update-expense/:id',async function (request,response) {
    try{
        const expenseData = await Expense.findById(request.params.id)
        if(expenseData){
            await Expense.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })

            response.status(200).json({
                "status" : "success",
                "message" : "entry updated"
            })
        }
        else{
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not update entry",
            "error" : error
        })
    }
})