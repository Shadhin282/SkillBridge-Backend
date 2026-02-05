import { NextFunction, Request, RequestHandler, Response } from "express";
import { tutorService } from "./tutor.service";


const getTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, rating, price, category } = req.query;

    const searchString = typeof search === "string" ? search : "";
    const categoryName = typeof category === "string" ? category : "";

    const ratingNumber =
      typeof rating === "string" && !isNaN(Number(rating)) ? Number(rating) : 0;

    const priceNumber =
      typeof price === "string" && !isNaN(Number(price)) ? Number(price) : 0;

    const result = await tutorService.getTutor(
      searchString,
      ratingNumber,
      priceNumber,
      categoryName,
    );

    if (!result ) {
      return res.status(404).json({
        success: false,
        message: "No tutor data found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Required data fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


const postTutor : RequestHandler = async (req, res, next) =>{
      try {
          if(!req.user){
            return res.send("unauthorized")
          }

          const result = await tutorService.postTutor(req.body, req.user.id as string)
          
           if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor Data has not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor Data has created successfully",
      data: result,
    });
        } catch (error) {
          next(error)
      }
}


const getTutorById = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.send("No Id provide");
    }
    const result = await tutorService.getTutorById(id as string);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor info not get",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile info got successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


const putTutorAvilability : RequestHandler = async (req, res, next) => {
    try {
          if(!req.user){
            return res.send("Unathorized")
          }
            const result = await tutorService.putTutorAvilability(req.body,req.user.id as string)
          if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
      data: result,
    });
          
          } catch (error) {
      next(error)
    }
}


const putTutorProfile : RequestHandler = async (req, res, next) => {
  try {
     if(!req.user){
            return res.send("Unathorized")
          }
            const result = await tutorService.putTutorProfile(req.body,req.user.id as string)
          if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not update.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  
            } catch (error) {
    next(error)
  }
}
export const tutorController = {
  getTutor,
  getTutorById,
  postTutor,
  putTutorAvilability,
  putTutorProfile
};
