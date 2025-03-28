import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:''
    },
    uid:{
        type:String,
        unique:true
    }
},{
    timeStamps:true
})

export  const User = mongoose.model('User' , userSchema);
