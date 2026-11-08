import { userModel } from "../../database/models/index.js"
import {verifyToken} from "../../common/security/index.js"



export const updateUser = async(token , data)=>{
    let {sub} = verifyToken({
        token
    })
    let user = await userModel.findByIdAndUpdate(sub, data )
    return user
}