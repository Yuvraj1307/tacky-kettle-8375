const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routs/usersrout")
const {authforuser}=require("./moddleware/authforuser")
const {brandmodel}=require("./models/brandmodel")
const cors=require("cors")
const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.get("/",async (req,res)=>{
  try{
    let data=await brandmodel.find()
    res.send(data)
  }catch(err){
    res.send("can't send data")
    console.log(err)
  }
    
})

//app.use(authforuser)
app.use("/user",userRouter)

app.post("/brand",async (req,res)=>{
  try{
    let data=req.body
    let brand=await brandmodel.insertMany(data)
    console.log(brand)
    res.send(brand)
  }catch(err){
    res.send("can't add brand")
    console.log(err)
  }
})





require('dotenv').config()
app.listen(process.env.port, async ()=>{
  try{
    await connection
    console.log("connected to database")
  }catch(err){
    console.log("can't connect to database")
    console.log(err)
  }
})