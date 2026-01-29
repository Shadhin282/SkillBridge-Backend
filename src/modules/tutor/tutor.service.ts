import { prisma } from "../../lib/prisma"

const getTutor = async( search: string | undefined,rating : number| undefined, price: number | undefined)=>{

        const result = await prisma.tutorProfile.findMany({
            where: {
                subjects : {
                    has : search as string
                },
                hourlyRate : price as number,
                review : {
                    rating : rating as number 
                }
                
            }
        })

        return result;
    }




export const tutorService = {
        getTutor,
} 