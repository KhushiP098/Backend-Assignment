const tagModel = require('../models/tag');

exports.createTag = async (req, res) => {
    try{
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ success: false, message: "Tag name is required!" });
        }

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