const express = require("express")
const bodyParser = require("body-parser")
const {default:mongoose} = require("mongoose")
const route = require("./router/router")
const cors = require("cors")
const multer = require("multer")
const dotenv = require("dotenv")
const app = express()
dotenv.config()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(multer().any())
app.use(cors({origin:"*"}))
cors.autocrlf=true

app.use("/", route)

mongoose.connect(process.env.uri ,{
    useNewUrlParser:true
}).then(()=>{console.log("Mongoose connected")})
.catch((err)=>console.log(err))

app.listen(process.env.PORT||4000, ()=>{
    console.log("server run on "+(process.env.PORT||4000))
})