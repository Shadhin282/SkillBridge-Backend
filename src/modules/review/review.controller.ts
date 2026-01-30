import { Request, Response } from "express"
import { reviewsService } from "./review.service"



const getReview = async (req:Request,res: Response)=>{
        try {
                const result = await reviewsService.getReview()
                res.status(200).json({
                        success: true,
                        message : "Review Data fetch Successfully",
                        data : result
                })
        } catch (error) {
                res.status(500).json({
                        success: false,
                        message : "Internal error",
                        error : error
                })
        }
}
const postReview = async (req:Request,res: Response)=>{
        try {
                const {rating, comment} = req.body;
                const result = await reviewsService.postReview(req.body)
                 res.status(201).json({
                        success: true,
                        message : "Review Data fetch Successfully",
                        data : result
                })
        } catch (error) {
                res.status(501).json({
                        success: false,
                        message : "Internal error",
                        error : error
                })
        }
}




export const reviewsController = {
        getReview,
        postReview
}