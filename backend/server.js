const express = require("express")
const app = express()
const connectDB = require("./models/database");

require("dotenv").config()
const PORT = process.env.PORT

const cors = require("cors");
const corsOptions = {
    origin: [process.env.FRONTEND_URL],
}

app.use(cors())

app.use(express.json())

connectDB()




app.get("/" , (req , res)=>{
    res.json({
        message: `app working fine on port : ${process.env.PORT}`
    })
})

const user = require("./routes/userRoute") 
app.use("/api/v1", user)


app.listen(PORT , ()=>{
    console.log(`app working fine on ${process.env.PORT}`);
})