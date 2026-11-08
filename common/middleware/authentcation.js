import { userModel } from "../../database/models/index.js"
import { BadRequestException} from "../utils/exceptions.js"
import { verifyToken } from "../security/jwt.js"
import {tokenTypeEnum} from "../enums/tokenType.enum.js"


export const auth = ({tokenType = tokenTypeEnum.ACCESS})=>{
    return async (req,res,next)=>{

    let token = req.headers.authorization
    if(!token){
        BadRequestException("token not provided")
    }

    let payload = verifyToken({
        token,
        tokenType
    })
    
    req.user = await userModel.findById(payload.sub)
    req.payload = payload
    next()
    }

}