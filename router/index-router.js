import express from 'express'

import addNewImg from '../controllers/add-controller/add-new-img.js'
import addExistingImg from '../controllers/add-controller/add-existing-img.js'

import { upload } from '../config/multer-config.js'

const indexRouter= express()

indexRouter.route('/health').get((req, res)=>{res.send("Api is healthy")})

indexRouter.route('/add-new-img').post(upload.single("imageFile"), addNewImg)
indexRouter.route('/add-existing-img').post(addExistingImg)
indexRouter.route('add')



export default indexRouter