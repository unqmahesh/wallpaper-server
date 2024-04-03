import ImageModel from "../../schema/img-schema.js";

const getSearchedImgs = async (req, res, next) => {
    try{

        const {pageNumber, pageSize, searchedWords, aspectRatio} = req.body

        const offset = (pageNumber - 1 ) * pageSize
        const limit = pageSize
        let imageData

        if(searchedWords){

            imageData = await ImageModel.find({
                'keyWords' : {$in : searchedWords.map(word => new RegExp(word, 'i'))},
                'aspectRatio' : aspectRatio
            }).skip(offset).limit(limit)
        }
        else{
            imageData = await ImageModel.find({
                aspectRatio : aspectRatio
            }).skip(offset).limit(limit)
        }

        res.status(200).json({success : true, data : imageData})

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

export default getSearchedImgs