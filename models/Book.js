const mongoose= require("mongoose")

const bookSchema= new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,enum:['Fiction','Science','Comic'],required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
},
{
    versionKey:false
})

module.exports=mongoose.model("Book",bookSchema);