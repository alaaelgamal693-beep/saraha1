import {Router} from "express"
import * as as from "./auth.service.js"
import {response, tokenTypeEnum} from "../../common/index.js"
import {auth} from "../../common/middleware/authentcation.js"


export const authController = Router()

authController.post("/signup", async(req,res,next)=>{
    let user = await as.signup(req.body)
    response({
        res ,  data:user , status :201 , message : "user created"
    })
})

authController.post("/login", async(req,res,next)=>{
    let user = await as.login(req.body)
    response({
        res ,  data:user , status :200 , message : "user logged in"
    })
})


authController.post("/rotate-token", auth({ tokenType :tokenTypeEnum.REFRESH}), async (req, res, next)=>{
    let tokens = await as.rotateToken(req.user , req.payload )
    response({
        res ,  data:tokens , status :200 , message : "token rotated"
    })
})