const AWS = require("aws-sdk");
const router = require("express").Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID /* required */,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY /* required */,
  Bucket: process.env.AWS_BUCKET /* required */,
});

router.get("/s3", async (req: any, res: any) => {
  try {
    console.log("here 1");

    const myObject = await getObject("angular-image.png");

  } catch (err) {
    console.log("AWS error");
  }
});

export async function getObject(objectKey: any) {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: objectKey,
    };
   
  var fileStream = s3.getObject(params).createReadStream();
  console.log(fileStream)
  return fileStream;

  } catch (e) {
    throw new Error(`Could not retrieve file from S3`);
  }
}

export default router;
