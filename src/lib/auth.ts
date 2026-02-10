import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
     secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
     trustedOrigins : [process.env.FRONTEND_URL!],
     user : {
         additionalFields : {
            role : {
            type : 'string',
            defaultValue : "STUDENT",
            required : false
         },
         status : {
            type : 'string',
            defaultValue : "ACTIVE",
            required : false
         }
         }
     },
    emailAndPassword : {
        enabled : true
    },
    socialProviders : {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
    },
  //    session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 5 * 60, // 5 minutes
  //   },
  // },
  // advanced: {
  //   cookiePrefix: "better-auth",
  //   useSecureCookies: process.env.NODE_ENV === "production",
  //   crossSubDomainCookies: {
        
  //     enabled: false,
  //   },
  //   disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  // },

});