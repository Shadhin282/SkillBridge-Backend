import express from "express";
import { userController } from "./admin.controller";
import { auth } from "../../middleware/auth";



const router = express.Router();

router.get('/',auth(),userController.getUsers)
router.patch('/:id',userController.getUsersById)




export const userRoute = router;