const express= require('express');
const router= express.Router();

const { createTag,getTags } = require('../controllers/tag');

router.post('/create',createTag );
router.get('/get',getTags);


module.exports=router;