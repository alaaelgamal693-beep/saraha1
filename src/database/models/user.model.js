import mongoose from"mongoose"
import {GenderEnum} from "../../common/enums/gender.enum.js"
import {RoleEnum} from "../../common/enums/role.enum.js"


const userSchema = new mongoose.Schema({
    firstName:{
        type :String,
        maxLenght : 50,
        minLLenght : 2,
        required :true
    },
    lastName:{
        type :String,
        maxLenght : 50,
        minLLenght : 2,
        required :true
    },
    email :{
        type :String,
        maxLenght : 100,
        minLLenght : 5,
        required :true,
        unique : true
    },
    gender : {
        type : Number,
        enum : Object.values(GenderEnum),
        default : GenderEnum.male
    },
    password :{
        type : String,
        required : true,
    },
    phone:{
        type : String,
    },
    role:{
        type : Number,
        enum : Object.values(RoleEnum),
        default : RoleEnum.user
    }
},{
    timestamps :true,
    strict : true,
    strictQuery : true,
    toJson : {
        virtuals : true
    },
    toObject:{
        virtuals : true
    },
    autoIndex : true
})

userSchema.virtual("userName").set(function(value){
    let [firstName, lastName] =value.split(" ")
    this.firstName = firstName
    this.lastName = lastName
}).get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const userModel = mongoose.model("User", userSchema)