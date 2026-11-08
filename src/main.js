import express from 'express';
import configService from "./config/config.service.js"
import {dbconnect} from "./database/connection.js"
import {errorHandler} from "./common/index.js"
import {authController} from "./module/auth/auth.controller.js"
import crypto from "node:crypto"
import {encryption , decryption} from "./common/security/encryption.js"
import { userController } from './module/user/user.controller.js';


const app = express()
const port = configService.port

await dbconnect()



app.use(express.json())


app.use("/auth", authController)
app.use("/user", userController)


app.get("/",(req, res) =>{
    res.status(200).json({
        message: "i'm good"
    })
})

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})

