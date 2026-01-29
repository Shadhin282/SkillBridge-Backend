import { UserStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getUsers = async () =>{

        const result = await prisma.user.findMany()
        return result 
}

const getUsersById = async (id : string,status : string ) =>{
        const result = await prisma.user.update({
                where : {
                        id : id 
                },
                data : {
                        status : status as UserStatus
                }
        })

        return result ;
}




export const userService = {
        getUsers,
        getUsersById
} 