import ImageModel from '../../schema/img-schema.js'
import cdUploadImg from '../../services/cloud-upload-img.js'

const addNewImg = async (req, res, next) => {

    try{

        const {base64Img, createdBy, aspectRatio, keyWords, height, width} = req.body

        const response = await cdUploadImg(base64Img)

        const url = response.data.data.url
        const publicId = response.data.data.public_id

        const imgData = {
            aspectRatio,
            createdBy,
            keyWords,
            imageResolutions : [{
                url,
                publicId,
                height, 
                width,
            }]
        }
        
        const createdData = await ImageModel.create(imgData)

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