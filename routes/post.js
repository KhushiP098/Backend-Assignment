const express= require('express');
const router= express.Router();
const upload=require('../config/multer')

const { createPost, getPosts,searchPosts }=require('../controllers/post');


router.post('/create',upload.single('image'),createPost );
router.get('/get',getPosts);  //post/get?page=1&limit=10&sort=title&order=desc
// router.get('/filter/:tagName',filterPosts)  // to filter the posts on the basis of tags
router.get('/search/:searchKeyword',searchPosts) // to search keyword in the title and the description


module.exports=router;