import { Request, RequestHandler, Response } from "express"
import { userService } from "./admin.service"



const getUsers= async (req:Request,res: Response)=>{
        try {
                const result = await userService.getUsers()
                res.status(200).json({
                        success: true,
                        message : "Users Data fetch Successfully",
                        data : result
                })
        } catch (error) {
                res.status(500).json({
                        success: false,
                        message : "Internal error",
                        error : error
                })
        }
}

const getUsersById = async (req:Request, res: Response) => {
        try {
                const {id} = req.params;
                // const {status} = req.body;
                // console.log("id ", id,"status ", status)
                if(!id){
                        return res.send("No Id")
                }
                const result = await userService.getUsersById(id as string)
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
                 res.status(500).json({
                        success: false,
                        message : "Internal error",
                        error : error
                })
        }
}


const patchUsersById : RequestHandler = async (req,res, next) => {
                try {
                        
                    const result = await userService.patchUsersById(req.body) 
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


const getStats : RequestHandler = async (req, res, next)=>{
        try {
                const result = await userService.getStats()
                 if (!result) {
      return res.status(404).json({
        success: false,
        message: "Stats Data not fetch",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stats Data fetch successfully",
      data: result,
    });
        } catch (error) {
                next(error)
        }
}



export const userController = {
        getUsers,
        getUsersById,
        getStats,
        patchUsersById 
}