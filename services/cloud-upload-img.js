import { v2 } from "cloudinary";
import crypto from 'crypto'
import fs from 'fs'

import { imageName } from "../config/multer-config.js";

const cdUploadImg = async() => {
    try{

        v2.config({
        cloud_name: process.env.CD_CLOUD_NAME,
        api_key: process.env.CD_API_KEY,
        api_secret: process.env.CD_API_SECRET,
        secure: true,
        });
        

        const uniqueId = crypto.randomUUID()

        const imageFormat = imageName.split(".")[1]
        const imgFilePath = `images/${uniqueId}.${imageFormat}`
        const imageData = fs.readFileSync(`uploads/${imageName}`)
        const imageBuffer = Buffer.from(imageData)

        fs.writeFileSync(imgFilePath, imageBuffer)
        
        const options = {
            resource_type: 'auto', 
            use_filename: true, 
            unique_filename: false,
            overwrite: true,
          };
        
        const response = await v2.uploader.upload(imgFilePath, options)
        
        fs.unlinkSync(imgFilePath)

        return response
    }
    catch(error){
       const err = new Error()
       err.name = error.name || "CLOUD_UPLOAD_FAILED"
       err.message = error.message || "unable to upload the image to the cloud"
       err.status = 500

       throw err
    }   
}

export default cdUploadImg