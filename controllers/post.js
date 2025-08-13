const postModel = require('../models/post');
const tagModel=require('../models/tag')
const { uploadFileToS3 } = require('../config/awsS3');
const mongoose=require('mongoose')

exports.createPost = async (req, res) => {
    try {
        let { title, description, tags } = req.body;
        const image = req.file;

        if (!image) return res.status(400).send({ success: false, message: "IMAGE IS REQUIRED!" })
        if (!title || !description) return res.status(400).send({ success: false, message: "ALL FIELDS ARE REQUIRED!" })
        
        tags=tags.split(",").map((tag)=> new mongoose.Types.ObjectId(tag))

        if(tags){
            const existingTags=await tagModel.find({_id:{$in:tags}})
            if (existingTags.length!=tags.length)return res.status(400).send({success:false,message:"TAG NOT FOUND"})
        }
        
        const imageUrl=uploadFileToS3(image)
        // const imageUrl=`https://${image.originalname }`
        const post = await postModel.create({ title, description, image: imageUrl, tags });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        })

    } catch (error) {
        console.log("error==>", error)
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        })
    }
}

exports.getPosts = async (req, res) => {
    try {
        let { tag, sort, order, page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;


        let sortOption = {};
        if (sort) sortOption[sort] = order === 'desc' ? -1 : 1;
        else sortOption ={ createdAt: -1 };

        let filterObject={}
        if (tag){           
            tag=tag.split(",").map((tag)=> new mongoose.Types.ObjectId(tag))
            filterObject={tags:{$in:tag}}
        }

        const posts = await postModel.find(filterObject).populate('tags').sort(sortOption).skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts
        });
    }
    catch (error) {

        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        })
    }
}

exports.searchPosts = async (req, res) => {
    try {
        const { searchKeyword } = req.params;

        const posts = await postModel.find({ $text: { $search: searchKeyword } }).populate("tags");
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        })

    }
}

exports.filterPosts=async (req,res)=>{
    try{
       let {tags}=req.body;
        tags=tags.split(",").map((tag)=> new mongoose.Types.ObjectId(tag))
        const posts=await postModel.find({tags:{$in:tags}}).populate("tags")

        return res.status(200).json({
            success: true,
            message: "Posts filtered successfully",
            data: posts
        });

    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: "INTERNAL SERVER ERROR"
        })
    }
}