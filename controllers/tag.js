const tagModel = require('../models/tag');

exports.createTag = async (req, res) => {
    try{
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ success: false, message: "Tag name is required!" });
        }

        const existingTag=await tagModel.find({name});
        if(existingTag)return res.status(400).send({success:false,message:"TAG ALREADY EXISTS"})

        const tag = await tagModel.create({ name });

        return res.status(201).json({
            success: true,
            message: "TAG CREATED SUCCESSFULLY",
            data: tag
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });
    }
}

exports.getTags=async (req,res)=>{
    try{

        const tags=await tagModel.find({});
        return res.status(201).json({
            success: true,
            message: "TAGS FETCHED  SUCCESFULLY",
            data:tags
        });

    }
    catch(error){
         return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        });

    }
}