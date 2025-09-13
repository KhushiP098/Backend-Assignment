const express= require('express');
const router= express.Router();
const upload=require('../config/multer')

const {getObjectUrl,uploadPrivateFileToS3}=require('../config/awsS3')

const { createPost, getPosts,searchPosts,filterPosts }=require('../controllers/post');


router.post('/create',upload.single('image'),createPost );
router.get('/get',getPosts);  //post/get?page=1&limit=10&sort=title&order=asc&tag=689c6ecd7686281974b729e5,689c71658826e1d4ceccad59
router.get('/filter',filterPosts)  // to filter the posts on the basis of tags
router.get('/search/:searchKeyword',searchPosts) // to search keyword in the title and the description


router.get('/presignedurl/:key',async(req,res)=>{

    const {key}=req.params;
   const url=await getObjectUrl(key)
   return res.status(200).json({url})
})

router.post('/uploadPrivateFile',upload.single('image'),async(req,res)=>{
    const image = req.file;
     const imageUrl=await uploadPrivateFileToS3(image)
            if (!imageUrl) return res.status(500).send({ success: false, message: "IMAGE UPLOAD FAILED!" })

            return res.status(201).json({
                data: imageUrl
            })

})

module.exports=router;