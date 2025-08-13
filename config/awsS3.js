const {S3Client ,PutObjectCommand} =require("@aws-sdk/client-s3")
require("dotenv").config();

const s3=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    },
})


async function uploadFileToS3(file){
    const fileKey=file.originalname;

    const params={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:fileKey,
        Body:file.buffer,
        ContentType:file.mimetype,
        ACL:"public-read"
    };

    try{
        const command=new PutObjectCommand(params);
        await  s3.send(command);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    }
    catch(error){
        return false;
    }
}

module.exports={uploadFileToS3};