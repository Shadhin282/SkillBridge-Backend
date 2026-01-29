import express from "express";
import { bookingController } from "./booking.controller";


const router = express.Router();

router.get('/',bookingController.getBooking)
router.get('/:id', bookingController.getBookingById)
router.post('/',bookingController.postBooking)




export const bookingRoute = router;