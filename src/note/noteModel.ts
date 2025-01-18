import mongoose from "mongoose";
import { Note } from "./noteTypes";

const noteScheme = new mongoose.Schema<Note>({
    title : {
        type : String,
        required : true
    },
    subtitle : String,
    description : {
        type : String,
        required : true
    },
    file : String
},{timestamps : true})

export default mongoose.model<Note>("Note",noteScheme)