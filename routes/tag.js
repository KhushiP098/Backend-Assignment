const express= require('express');
const router= express.Router();

const { createTag } = require('../controllers/tag');

router.post('/create',createTag );
// router.get('/get',getAllTags);


module.exports=router;