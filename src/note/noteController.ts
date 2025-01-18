import { NextFunction, Request, Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../config/config";
import globalErrorHandler from "../middlewares/globalErrorHandler";
import createHttpError from "http-errors";


const createNote = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const file = req.file ? `${envConfig.backendUrl}/${req.file.filename}` : 'https://www.shutterstock.com/image-vector/high-quality-emoticon-on-white-600nw-1750189520.jpg'
    const {title, subtitle, description} = req.body
    if(!title || !subtitle || !description){
        res.status(400).json({
            message : "Please provide title, subtitle and description"
        })
        return
    }
    await noteModel.create({
        title,
        subtitle,
        description,
        file
    })
    res.status(201).json({
        message : "Note created"
    })
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, 'Error while creating'))
    }
}

const listNotes = async (req:Request,res:Response, next:NextFunction)=>{
try {
    const notes = await noteModel.find()
    res.status(200).json({
        message : "Notes fetched",
        data : notes
    })
} catch (error) {
    return next(createHttpError(500, "Error while fetching notes..."))
}
}

const listNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const note = await noteModel.findById(id)
        if(!note){
            return next(createHttpError(404, "Note not found with with that it"))
        }
        res.status(200).json({
            message: "Note fetched",
            data: note
        })
    } catch (error) {
        return next(createHttpError(500, "Error while fetching note..."))
    }
}

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const note = await noteModel.findByIdAndDelete(id)
        if(!note){
            return next(createHttpError(404, "Note not found with with that it"))
        }
        res.status(200).json({
            message: "Note deleted"
        })
    } catch (error) {
        return next(createHttpError(500, "Error while deleting note..."))
    }
}

export {createNote, listNotes, listNote, deleteNote}