import express from "express";
import { userController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";



const router = express.Router();

router.get('/users',auth(UserRole.ADMIN),userController.getUsers)
router.get('/users/:id',auth(UserRole.ADMIN,UserRole.STUDENT),userController.getUsersById)
router.patch('/users/:id',auth(UserRole.ADMIN,UserRole.STUDENT),userController.patchUsersById)
router.get('/stats',auth(UserRole.ADMIN), userController.getStats)



export const userRoute = router;