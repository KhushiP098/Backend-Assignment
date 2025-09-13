const {S3Client ,PutObjectCommand,GetObjectCommand} =require("@aws-sdk/client-s3")
const {getSignedUrl}  =require("@aws-sdk/s3-request-presigner")
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
        ContentType:file.mimetype
    };

    try{
        const command=new PutObjectCommand(params);
        await  s3.send(command);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
    }
    catch(error){
        console.error("Error uploading file to S3:", error);
        return false;
    }
}

async function uploadPrivateFileToS3(file){
    const fileKey=file.originalname;
    const params={
        Bucket:process.env.AWS_PRIVATE_BUCKET_NAME,
        Key:fileKey,
        Body:file.buffer,
        ContentType:file.mimetype
    }

    const command=new PutObjectCommand(params)
   const response= await s3.send(command)

   const url=await getObjectUrl(fileKey)
   return url;
}

async function getObjectUrl(key){
    const params={
        Bucket:process.env.AWS_PRIVATE_BUCKET_NAME,
        Key:key
    }
    const command=new GetObjectCommand(params)

    const url=await getSignedUrl(s3,command,{expiresIn:60});
    return url;
}

module.exports={uploadFileToS3,uploadPrivateFileToS3,getObjectUrl};