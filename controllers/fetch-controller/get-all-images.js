import ImageModel from "../../schema/img-schema.js";

const getAllImages = async (req, res, next) => {
    try{

        const {pageNumber, pageSize} = req.body
        console.log(pageNumber, pageSize)
        const offset = (Number(pageNumber) - 0 ) * pageSize
        const limit = pageSize

        const images = await ImageModel.find().skip(offset).limit(limit)

        res.status(200).json({success : true, data : images})

    }
    catch(error)
    {
        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(err)
    }
}

export default getAllImages