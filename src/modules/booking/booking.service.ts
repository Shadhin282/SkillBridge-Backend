import { prisma } from "../../lib/prisma"

const getBooking = async ()=>{
        const result = await prisma.booking.findMany()
}

const getBookingById = async (id:string)=> {
        const result = await prisma.booking.findFirst({
                where : {
                        studentProfile : {
                                studentId : id
                        } 
                }
        })
}

const postBooking = async (payload:{}) => {
        const result = await prisma.booking.create({
                data :payload
        })
        return result;
}


export const bookingService = {
        getBooking,
        postBooking,
        getBookingById
} 