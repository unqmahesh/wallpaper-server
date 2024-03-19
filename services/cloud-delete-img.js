import {v2} from 'cloudinary'

const cdDeleteImg = async (imgPublicId, next) => {
    try{

        v2.config({
            cloud_name: process.env.CD_CLOUD_NAME,
            api_key: process.env.CD_API_KEY,
            api_secret: process.env.CD_API_SECRET,
            secure: true,
            });

        const options = {
            invalidate : true
        }

        const response = await v2.uploader.destroy(imgPublicId, options)
        
        return response
    }
    catch(error){
        const err = new Error()
        err.name = error.name || "UNABLE_TO_DELETE_IMG"
        err.message = error.message || "unable to delete the image from cloud"
        err.status = 500

        next(err)
    }
}

export default cdDeleteImg