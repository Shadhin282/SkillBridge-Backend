import { TutorProfile } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";


  
 const getTutor = async (
  search?: string,
  rating?: number,
  price?: number,
  categoryName?: string,
) => {
  
  const result = await prisma.tutorProfile.findMany({
    where: {
      AND: [
    ...(search ? [{ subjects: { hasSome: [search], },},]: []),
    ...(price ? [{ hourlyRate: { lte: price, }, }, ] : []), 
    ...(rating ? [ { review: { some: { rating: { gte: rating, } }, }, }, ] : []),
    ...(categoryName ? [ { category: { name: categoryName, }, }, ] : []), ], },
      include: {
          category: true,
          _count : {
            select : {
              review : true
            }
          },
          user : true
      }
   
    },
  );

  

  return result;
};


const postTutor = async (payload: {}, id : string)=>{
        const result = await prisma.tutorProfile.create({
           data : {...payload, authorId : id}
        })
        return result
}  


const getTutorById = async (id: string )=>{
            const result = await prisma.tutorProfile.findFirst({
                where : {
                  id
                   
                },
                
            })
            return result 
}


const putTutorAvilability = async (payload:TutorProfile, userId : string) => {
        const result = await prisma.tutorProfile.update({
            where : {
              authorId : userId
              
            },
            
            data : { 
           
              
       
              availability : payload.availability as any
            }
        })
        return result;
}


const putTutorProfile = async (payload:{id: string;
    authorId?: string;
    bio?: string | null;
    hourlyRate?: number | null;
    subjects?: string[];
    availability?: any;
    categoryName?: string | null;}, userId : string) => {
        const result = await prisma.tutorProfile.update({
            where : {
            
              authorId : userId
            },
            data : {...payload}
        })
        return result;
}



export const tutorService = {
  getTutor,
  getTutorById,
  postTutor,
  putTutorAvilability,
  putTutorProfile
};
