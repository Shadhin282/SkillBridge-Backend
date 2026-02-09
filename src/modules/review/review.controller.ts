import { NextFunction, Request, RequestHandler, Response } from "express"
import { reviewsService } from "./review.service"




const getReview = async (req:Request,res: Response, next:NextFunction)=>{
        try {
                const result = await reviewsService.getReview()
                 if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Review has not got"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Review Data fetch Successfully",
                        data : result
                })
        } catch (error) {
                next(error)
        }
}


const getReviewById : RequestHandler = async (req,res,next)=>{
        try {
                if(!req.params){
                        return res.send("id not provide")
                }
                const id = req.params.id ;
                
                const result = await reviewsService.getReviewById(id as string )
                
                 if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Review has not got"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Review Data fetch Successfully",
                        data : result
                })

        } catch (error) {
                next(error)
        }
}


const postReview = async (req:Request,res: Response, next: NextFunction)=>{
        try {
                const {rating, comment} = req.body;
                if(!req.user){
                        return res.send("unauthorized")
                }
                const result = await reviewsService.postReview(req.body, req.user.id as string)
                if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Review has not created"
                        })
                }
                 res.status(201).json({
                        success: true,
                        message : "Review Data has created Successfully",
                        data : result
                })
        } catch (error) {
                next(error)
        }
}




export const reviewsController = {
        getReview,
        postReview,
        getReviewById
}