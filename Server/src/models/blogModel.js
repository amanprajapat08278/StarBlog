const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    blogImage:{
        type:String
    },
    tags:{
        type:[String]

    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:[String]
    },
    deletedAt:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:String,
    },
    isPublished:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports=mongoose.model('Blog',blogSchema)
