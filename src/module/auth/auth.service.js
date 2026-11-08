import { exceptions } from "../../common/index.js"
import {userModel} from "../../database/models/user.model.js"
import { myHash} from "../../common/security/index.js"
import {HashEnum, myCompare } from "../../common/index.js"
import {encryption} from "../../common/security/encryption.js"
import { createTokens } from "../../common/security/jwt.js"
import configService from "../../config/config.service.js"
import { ConflictException } from "../../common/utils/exceptions.js"


export const signup = async (data) => {
    let exists = await userModel.findOne({email :data.email})
    if(exists) exceptions.ConflictException("user already exists")
        data.password = await myHash({plainText : data.password , lib :HashEnum.argon2})
    data.phone = encryption(data.phone)
    let user = await userModel.create(data)
    return user
}

export const login = async ({email , password}) => {
    let user = await userModel.findOne({email})
    if(!user) exceptions.NotFoundException("user does not exist")
    let matchPassword = await myCompare({plainText: password, encrypted : user.password , lib : HashEnum.argon2})
    if(!matchPassword) exceptions.NotFoundException("user not found")

    let tokens = createTokens ({
        payload: {},
        options : { subject: user._id.toString(), issuer: "ali" , audience : user.role },
        role : user.role
    })

    return tokens
}



export const rotateToken = (user, payload)=>{
    let accessIAT = payload.iat *1000
    let accessExpIn = configService.JWT_ACCESS_EXP *1000
    let accessExpAt = accessExpIn + accessIAT
    let currTime = Date.now()


    if(currTime < accessExpAt){
        ConflictException("access token still valid")
    }
    let {accessToken} = createTokens({
        options : { subject: user.id , issuer: "ali" , audience : ["admin" , "user"] }
    })

    return { 
        accessExpAt,
        currTime
    }
}