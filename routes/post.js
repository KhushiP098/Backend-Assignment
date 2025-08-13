const express= require('express');
const router= express.Router();
const upload=require('../config/multer')

const { createPost, getPosts }=require('../controllers/post');


router.post('/create',upload.single('image'),createPost );
// router.get('/get',getPosts);
// router.get('/filter/:tagName',filterPosts)  // to filter the posts on the basis of tags
// router.get('/search/:keyword',SearchPosts) // to search keyword on the title and the description


module.exports=router;