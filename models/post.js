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
    image:[{
        type: String,
        required: true
    }],
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tag"
        }
    ]

})


module.exports=mongoose.model('Post', postSchema);
