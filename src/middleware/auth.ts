import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../prisma/generated/prisma/enums";
import { auth as betterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string | null | undefined;
      };
    }
  }
}

export const auth = (...Roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("Middleware auth is working ", Roles)
      // console.log("header ", req.headers)
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      console.log(session)

      if(!session){
        return res.status(401).json({
            success : false,
            message : " You are Not authorized."
        })
      }

      req.user = {
        id : session.user.id,
        email : session.user.email,
        name : session.user.name,
        role : session.user.role || ""
      }

      if(!Roles.length && Roles.includes(req.user.role as UserRole)){
        return res.status(403).json({
            success : false,
            message : "Forbidden! You don't have permission to access this resources."
        })
      }

      next();
    } catch (error) {
      console.log(error);
    }
  };
};
