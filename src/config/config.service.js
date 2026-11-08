import {config} from "dotenv"
import {resolve} from "node:path"



const envFilePath = resolve (`.env.${process.env.NODE_ENV}`)
config({
    path : envFilePath
})


export default{
    port : Number(process.env.PORT),
    DB_URI : process.env.DB_URI,
    SALT : Number(process.env.SALT),
    ENC_KEY : process.env.ENC_KEY,
    ENC_IV_LENGTH : Number(process.env.ENC_IV_LENGTH),
    ENC_ALGO : process.env.ENC_ALGO,
    JWT_ACCESS_ADMIN_SECRET : process.env.JWT_ACCESS_ADMIN_SECRET,
    JWT_REFRESH_ADMIN_SECRET : process.env.JWT_REFRESH_ADMIN_SECRET,
    JWT_ACCESS_USER_SECRET : process.env.JWT_ACCESS_USER_SECRET,
    JWT_REFRESH_USER_SECRET : process.env.JWT_REFRESH_USER_SECRET,
    JWT_ACCESS_EXP : Number(process.env.JWT_ACCESS_EXP),
    JWT_REFRESH_EXP : process.env.JWT_REFRESH_EXP

}