import express from "express";
import { reviewsController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";


const router = express.Router();

router.post('/',auth(UserRole.STUDENT),reviewsController.postReview)
router.get('/',reviewsController.getReview)
router.get('/:id',reviewsController.getReviewById)



export const  reviewsRoute = router;