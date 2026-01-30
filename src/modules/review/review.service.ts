import { prisma } from "../../lib/prisma"

const getReview =async ()=>{
        const result = await prisma.review.findMany()
        return result
}
const postReview =async (payload:{ rating : number, comment: string, studentId: string, tutorId: string})=>{
        const result = await prisma.review.create({
                data  : {
                       rating :  payload.rating,
                       comment : payload.comment,
                       student: { connect: { id: payload.studentId } },
                       tutor: { connect: { id: payload.tutorId } }
                }
        })
        return result ;
}




export const reviewsService = {
        getReview,
        postReview
} 