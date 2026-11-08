import {Router} from "express"
import * as us from "./user.service.js"
import {response, RoleEnum, tokenTypeEnum} from "../../common/index.js"
import { auth} from "../../common/middleware/authentcation.js"
import {authorization} from "../../common/middleware/authorization.js"

export const userController = Router()





userController.get("/profile", auth({tokenType : tokenTypeEnum.ACCESS}) , async(req,res,next)=>{
    response({
        res ,  data:req.user , status :200 , message : "user fetched"
    })
})


userController.get("/admin-profile", auth({tokenType : tokenTypeEnum.ACCESS}) , authorization([RoleEnum.admin]) , async(req,res,next)=>{
    
    response({
        res ,  data:req.user , status :200 , message : "user fetched"
    })
})


userController.get("/update-user",auth({}) , async(req,res,next)=>{
    let token = req.headers.authorization

    let user = await us.updateUser(token)
    response({
        res ,  data:user , status :200 , message : "user updated in"
    })
})