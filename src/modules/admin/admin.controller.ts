import { Request, Response } from "express"
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
                const {status} = req.body;
                console.log("id ", id,"status ", status)
                if(!id){
                        return res.send("No Id")
                }
                const result = await userService.getUsersById(id as string,status )
                res.status(200).json({
                        success: true,
                        message : "User Data fetch Successfully",
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


export const userController = {
        getUsers,
        getUsersById
}