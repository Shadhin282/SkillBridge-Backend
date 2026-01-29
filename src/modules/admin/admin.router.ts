import express from "express";
import { userController } from "./admin.controller";



const router = express.Router();

router.get('/',userController.getUsers)
router.patch('/:id',userController.getUsersById)




export const userRoute = router;