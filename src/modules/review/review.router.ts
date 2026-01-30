import express from "express";
import { reviewsController } from "./review.controller";


const router = express.Router();

router.post('/',reviewsController.postReview)
router.get('/',reviewsController.getReview)



export const  reviewsRoute = router;