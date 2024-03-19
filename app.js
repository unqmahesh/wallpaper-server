import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import indexRouter from './router/index-router.js'
import errHandler from './middlewares/err-handler.js'

const app = express()

app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended:true}))

app.use('/image/api/v1', indexRouter)

app.use(errHandler)

export default app

