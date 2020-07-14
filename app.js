const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
require('./Employee')
app.use(bodyParser.json())

const Employee = mongoose.model("employee")


app.use('/data',(req,res)=>{
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

app.use('/send-data',(req,res)=>{
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

app.use('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch(
            err =>{ console.log(err)
        })
})

app.use('/update',(req,res)=>{
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
const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));