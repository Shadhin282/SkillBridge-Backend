import { success } from "better-auth/*";
import { Request, Response } from "express"
import { tutorService } from "./tutor.service";



const getTutor = async (req:Request,res: Response)=>{
    try {
        
        const {search, rating, price} = req.query;
        const searchString = typeof search === 'string' ? search : undefined;
        
        console.log(search, typeof rating, price)

        const ratingNumber = req.query.rating as number | undefined ;
        const priceNumber = req.query.price as number | undefined;

        const result = await tutorService.getTutor(searchString, ratingNumber, priceNumber)

        res.status(200).json({
            success : true,
            message : "Require Data Fetch Successfully.",
            data : result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error',
            data : error
        })

    }
}




export const tutorController = {
        getTutor,
}