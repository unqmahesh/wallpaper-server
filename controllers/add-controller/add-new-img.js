import ImageModel from '../../schema/img-schema.js'
import cdUploadImg from '../../services/cloud-upload-img.js'

import { imageName } from '../../config/multer-config.js'

import fs from 'fs'

const addNewImg = async (req, res, next) => {

    try{

        const {createdBy, aspectRatio, keyWords, height, width} = req.body

        const response = await cdUploadImg()


        const url = response.url || null  
        const publicId = response.public_id || null
        
        
        const imgData = {
            aspectRatio,
            createdBy,
            keyWords : keyWords.split(","),
            imageResolutions : [{
                url,
                publicId,
                height, 
                width,
            }]
        }
        
        const createdData = await ImageModel.create(imgData)

        fs.unlinkSync(`uploads/${imageName}`)

        res.status(200).json({success : true, data : createdData})

    }catch(error){
        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(error)
    }
} 

export default addNewImg