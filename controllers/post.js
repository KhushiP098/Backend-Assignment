const postModel = require('../models/post');
const { uploadFileToS3 } = require('../config/awsS3');


exports.createPost = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const image = req.file;

        if (!image) return res.status(401).send({ success: false, message: "IMAGE IS REQUIRED!" })
        if (!title || !description) return res.status(401).send({ success: false, message: "ALL FIELDS ARE REQUIRED!" })

        const imageUrl=uploadFileToS3(image)

        const post = await postModel.create({ title, description, image: imageUrl, tags })

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
        let { tags, sort, order, page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;


        let sortOption = {};
        if (sort) sortOption[sort] = order === 'desc' ? -1 : 1;
        else sortOption ={ createdAt: -1 };

        const posts = await postModel.find().sort(sortOption).skip(skip).limit(limit);
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

        const posts = await postModel.find({ $text: { $search: searchKeyword } });
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