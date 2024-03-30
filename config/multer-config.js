import multer from 'multer'

let imageName 

const storage = multer.diskStorage({
    destination : (req, file, cb) => {return cb(null, 'uploads/')},
    filename : (req, file, cb) => {
        imageName = file.originalname
        return cb(null, file.originalname)}
})

const upload = multer({storage : storage})

export {upload, imageName}