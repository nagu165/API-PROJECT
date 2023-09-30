const express = require('express')
const mongoose = require('mongoose')
const Pdt = require('./models/pdt-model')
const app = express()
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get("/", (req,res) => {
    res.send('Hello NodeAPI')
})
// getting all the pdts
app.get("/pdt", async(req,res) => {
    try {
        const pdts = await Pdt.find({});
        res.status(200).json(pdts);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// getting the individual pdt by using id
app.get("/pdt/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const pdt = await Pdt.findById(id);
        res.status(200).json(pdt);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// sending the pdt
app.post("/pdt", async(req,res) => {
    try {
        const pdt = await Pdt.create(req.body)
        res.status(200).json(pdt);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})
// updating the pdt
app.put("/pdt/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const pdt = await Pdt.findByIdAndUpdate(id, req.body);
        if(!pdt){
            return res.status(404).json({message : `cannot find pdt with id ${id}`})
        }
        const updatedPdt = await Pdt.findById(id);
        res.status(200).json(updatedPdt);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// deleting the pdt
app.delete("/pdt/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const pdt = await Pdt.findByIdAndDelete(id);
        if(!pdt){
            return res.status(404).json({message : `cannot find pdt with id ${id}`})
        }
        res.status(200).json(pdt);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
mongoose.connect('mongodb+srv://admin:12345admin@cluster0.r0frzgf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
.then(() => {
    console.log("connected to mongoDB")
    app.listen(3000, ()=>{
        console.log('server is running on port 3000')
    });
}).catch(() => {
    console.log("error")
})