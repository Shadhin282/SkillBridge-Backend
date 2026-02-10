import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRoute } from "./modules/tutor/tutor.router";
import { bookingRoute } from "./modules/booking/booking.router";
import { reviewsRoute } from "./modules/review/review.router";
import { userRoute } from "./modules/admin/admin.router";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";
import { categoriesRoute } from "./modules/categories/categories.router";


const app = express();


// Configure CORS to allow both production and Vercel preview deployments
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "http://localhost:4000",
//   process.env.PROD_APP_URL, // Production frontend URL
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "http://localhost:5000",
// ].filter(Boolean); // Remove undefined values

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (mobile apps, Postman, etc.)
//       if (!origin) return callback(null, true);

//       // Check if origin is in allowedOrigins or matches Vercel preview pattern
//       const isAllowed =
//         allowedOrigins.includes(origin) ||
//         /^https:\/\/skillbridge-two-flame.*\.vercel\.app$/.test(origin) ||
//         /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

//       if (isAllowed) {
//         callback(null, true);
//       } else {
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//     exposedHeaders: ["Set-Cookie"],
//   }),
// );


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // client side url
    credentials: true
}))

app.use(express.json());


// Auth route 
app.all('/api/auth/*splat', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});


app.use('/api/tutors',tutorRoute)

app.use('/api/tutor', tutorRoute)

app.use('/api/bookings',bookingRoute)

app.use('/api/reviews',reviewsRoute)

app.use('/api/categories', categoriesRoute)

app.use('/api/admin',userRoute)

app.get("/", (req, res) => {
    
    res.send("Hello, Skill Bridge World!");
});

app.use(notFound);
app.use(errorHandler)

export default app;
