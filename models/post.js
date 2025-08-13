const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tag"
        }
    ]
},
{timestamps:true})

postSchema.index({ title: "text", description: "text" });

module.exports=mongoose.model('Post', postSchema);
