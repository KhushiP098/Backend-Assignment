const express= require('express');
const router= express.Router();

const tagRoutes=require('./tag.js');
const postRoutes=require('./post.js');

router.use('/post',postRoutes);
router.use('/tag',tagRoutes);

module.exports=router;