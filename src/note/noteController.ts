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

export {createNote}