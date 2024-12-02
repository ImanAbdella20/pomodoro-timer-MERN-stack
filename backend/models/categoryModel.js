import mongoose from 'mongoose';

const categoryModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
        
    }],
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
});

const Category = mongoose.model('Category' , categoryModel)