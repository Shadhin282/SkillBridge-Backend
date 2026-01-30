import { prisma } from "../../lib/prisma"

const getReview =async ()=>{
        const result = await prisma.review.findMany()
        return result
}
const postReview =async (data: string)=>{
        const result = await prisma.review.create({
                data  
        })
}




export const reviewsService = {
        getReview,
        postReview
} 