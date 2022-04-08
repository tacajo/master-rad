const router = require('express').Router();
const s3 = require("../utils/s3");

router.post("/upload",(req: any, res: any)=>{
    const file = req.files.file;
    s3.uploadToS3(file,(error: any, data: any)=>{
        if(error){
            return res.send({error:"Something went wrong."});
        }
        return res.send({message:"File uploaded successfully"});
    });
});

export default router;