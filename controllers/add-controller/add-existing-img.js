import ImageModel from '../../schema/img-schema.js'
import cdUploadImg from '../../services/cloud-upload-img.js'

const addExistingImg = async (req, res, next) => {

    try{

      
        const {image_id, height, width} = req.body


        const existedImage = await ImageModel.findOne({_id : image_id})
 

        if(!existedImage){
            const err = new Error()
            err.name = 'IMAGE_NOT_FOUND'
            err.message = 'Unable to find the image'
            err.status = 409
            
            next(err)
        }

        const response = await cdUploadImg()

    
        console.log(response)
        const url = response.url
        const publicId = response.public_id


        const imgData = {
                url,
                publicId,
                height, 
                width
        }

        const updatedData = await ImageModel.findOneAndUpdate(
            {_id : image_id},
            {$push : {imageResolutions : imgData}}, {new : true})


        res.status(200).json({success : true, data : updatedData})

    }catch(error){

        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(error)
    }
} 

export default addExistingImg

