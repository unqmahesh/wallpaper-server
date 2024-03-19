import mongoose from "mongoose";

import errHandler from "../middlewares/err-handler.js";

const connectDB = async() => {
    try{

        const MONGO_URI=process.env.MONGO_URI
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB")// remove

    }catch(error){
        const err = new Error(error.message || 'Failed to connect to database')
        errHandler(err)
    }
}

export {connectDB}