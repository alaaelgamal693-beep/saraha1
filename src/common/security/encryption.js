import crypto from "node:crypto"
import configService from "../../config/config.service.js"

let {ENC_KEY , ENC_IV_LENGTH , ENC_ALGO} = configService

let key = Buffer.from(ENC_KEY, "hex")


export const encryption =(plaintext) => {
    const iv = crypto.randomBytes(ENC_IV_LENGTH)
    let cipherIv = crypto.createCipheriv(ENC_ALGO ,key, iv)
    let result = cipherIv.update(plaintext , "utf-8" , "hex")
    result += cipherIv.final("hex")
    return `${iv.toString("hex")}::${result}`
}


export const decryption = (cyphertext) =>{
    let [hexIv , encrypted] = cyphertext.split("::")
    const iv = Buffer.from(hexIv , "hex")
    const decipherIv = crypto.createDecipheriv(ENC_ALGO , key , iv)
    let result = decipherIv.update(encrypted , "hex" , "utf-8")
    result += decipherIv.final("utf-8")
    return result
}