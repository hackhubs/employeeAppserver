const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
require('./Employee')
app.use(bodyParser.json())

const Employee = mongoose.model("employee")


app.get('/data',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    })
    .catch(
            err => {console.log(err)}
        )
})
//connect to mongoDb
const mongoUri = "mongodb+srv://abhav:ab8988143226@employeeapp.v51d0.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri,{useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected .. to abhav database'))
    .catch(err => console.log(err));

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position,
        picture:req.body.picture
    })
    employee.save().then(data=>{
        console.log(data)
        res.send(data)
    }).catch(
            err => {console.log(err)}
        )
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(
            err =>{ console.log(err)
        })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position,
        picture:req.body.picture
    })
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(
        err => {console.log(err)}
    )
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})