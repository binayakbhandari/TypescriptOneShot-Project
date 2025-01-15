import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async ()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Successfully connected to db !!!")
        })
        await mongoose.connect(envConfig.mongodbString as string)
    } catch (error) {
        console.log("Failed to connet db !!!")
        process.exit(1)
    }
}

export default connectToDatabase