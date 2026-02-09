import { UserStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getUsers = async () =>{

        const result = await prisma.user.findMany()
        return result 
}

const getUsersById = async (id : string) =>{
        const result = await prisma.user.findFirst({
                where : {
                        id : id 
                },
               include : {
                student: true,
                booking : true,
                tutor : true,
               }
        })

        return result ;
}

const patchUsersById = async (payload:{id:string;status : string})=>{
        const result = await prisma.user.update({
                where :{
                        id : payload.id
                },
                data : {
                        status : payload.status
                }
        })
        return result;
}

const getStats = async () => {
        return await prisma.$transaction( async (tx) => {
        const [users,totalUser,bookings,totalBooking,totalCategory] =
                await Promise.all([
                        await tx.user.findMany({ orderBy:{createdAt : 'desc'}}),
                        await tx.user.count(),
                        await tx.booking.findMany({include:{student : true,tutor:true}, orderBy: { createdAt : 'desc'}}),
                        await tx.booking.count(),
                        await tx.category.count(),
                         ])


                return {
                        users,totalUser,bookings,totalBooking,totalCategory
                }
        })
}

export const userService = {
        getUsers,
        getUsersById,
        getStats,
        patchUsersById
} 