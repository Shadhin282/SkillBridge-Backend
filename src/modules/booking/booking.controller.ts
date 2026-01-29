import { Request, Response } from "express"
import { bookingService } from "./booking.service";



const getBooking= async (req:Request,res: Response)=>{
                try {
                        
                } catch (error) {
                        
                }
}


const getBookingById = async (req:Request, res:Response)=>{
        try {
                const {id} = req.params;
                if(!id){
                        return res.send("No ID");
                }
                const result = await bookingService.getBookingById(id as string)

        } catch (error) {
                
        }
}

const postBooking = async (req:Request, res: Response) => {
       try {
                 const bookingInfo = req.body;

        const result = await bookingService.postBooking(bookingInfo)
        
       } catch (error) {
        
       }
}



export const bookingController = {
        getBooking,
        postBooking,
        getBookingById
}