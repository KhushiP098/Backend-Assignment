const postModel = require('../models/post');
const {uploadFileToS3}=require('../config/awsS3')

exports.createPost=async(req,res)=>{
    try{
        const {title,description}=req.body;
        const image=req.file.image;
        
        if(!image)res.status(401).send({success:false,message:"IMAGE IS REQUIRED!"})
        if(!title || description)res.status(401).send({success:false,message:"ALL FIELDS ARE REQUIRED!"})
        console.log("title,description=>",title,description)

        // const imageUrl=uploadFileToS3(image)
        const imageUrl="ebhdewjdwjkdnwjdnw"
        // if(!imageUrl)return res.status(500).send({success:false,message:"FAILED TO UPLOAD IMAGE!"})

        const post=await postModel.create({title,description,image:imageUrl})

        return res.status(201).json({
            success:true,
            message:"Post created successfully",
            data:post
        })

    }catch(error){
        return res.status(500).send({
            success:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
}

