import {hash, compare , genSalt} from  "bcrypt"
import configService from "../../config/config.service.js"
import {HashEnum} from "../index.js"
import argon2 from "argon2"


export const myHash = async ({plainText , minor = "b" , lib = HashEnum.bcrypt})=> {

    switch(lib){
        case HashEnum.bcrypt:
            let salt = await genSalt(configService.SALT , minor)
            let result = await hash(plainText , salt)
            return result
            break;

        case HashEnum.argon2:
            return await argon2.hash(plainText)
            break;
    }

    let salt = await genSalt(configService.SALT , minor)
    console.log(salt)
    let result = await hash(plainText , salt)

    return result
}


export const myCompare = async ({plainText, encrypted , lib = HashEnum.bcrypt})=> {
    switch(lib){
        case HashEnum.bcrypt:
            return await compare(plainText , encrypted)
            break;

        case HashEnum.argon2:
            return await argon2.verify(encrypted, plainText)
            break;
    }
}
