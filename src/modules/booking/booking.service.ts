import { BookingStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getBooking = async ()=>{
        const result = await prisma.booking.findMany({
                include : {
                        student: true,
                        tutor: {
                                include:{
                                        user: true
                                }
                        }
                }
        })
        return result;
}

const getBookingById = async (id:string)=> {
        const result = await prisma.booking.findFirst({
                where : {
                       id
                }
        })
        return result;
}

const postBooking = async (payload: { date: Date; status?: string; tutorId: string }, userid : string) => {
        
        const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
                where : {
                        id : payload.tutorId
                }
        })
        console.log("tutor profile",tutorProfile)
        const result = await prisma.booking.create({
                data: {
                        date: payload.date,
                        status: payload.status as BookingStatus,
                        studentId : userid,
                        tutorId: payload.tutorId
                }
        })
        console.log("booking create ", result)
        return result;
}


export const bookingService = {
        getBooking,
        postBooking,
        getBookingById
} 