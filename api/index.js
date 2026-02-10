var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express6 from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// prisma/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String  @id\n  name          String\n  email         String\n  emailVerified Boolean @default(false)\n  image         String?\n  status        String? @default("ACTIVE")\n  role          String? @default("STUDENT")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  sessions Session[]\n  accounts Account[]\n\n  review  Review[]\n  tutor   TutorProfile?\n  student StudentProfile? @relation("StudentProfileRelation")\n  booking Booking?\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n}\n\nmodel Booking {\n  id        String        @id @default(uuid())\n  studentId String        @unique\n  tutorId   String\n  date      DateTime\n  status    BookingStatus @default(PENDING) // PENDING, CONFIRMED, CANCELLED, COMPLETED\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  student User         @relation(fields: [studentId], references: [id])\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  CANCELLED\n  COMPLETED\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  description String?\n\n  tutors TutorProfile[]\n\n  @@index([name])\n}\n\nmodel Review {\n  id        String   @id @unique @default(uuid())\n  studentId String\n  tutorId   String\n  rating    Int\n  comment   String?\n  createdAt DateTime @default(now())\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  @@index([studentId])\n  @@index([tutorId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel StudentProfile {\n  id               String   @id @default(uuid())\n  name             String\n  studentId        String   @unique\n  bio              String?\n  department       String?\n  FavroiteSubjects String[]\n\n  student User @relation("StudentProfileRelation", fields: [studentId], references: [id])\n}\n\nmodel TutorProfile {\n  id           String   @id @default(uuid())\n  authorId     String   @unique\n  bio          String?\n  hourlyRate   Float?\n  subjects     String[] // JSON string or comma separated\n  availability Json? // JSON string\n  categoryName String?\n\n  review  Review[]\n  booking Booking[]\n\n  user     User      @relation(fields: [authorId], references: [id])\n  category Category? @relation(fields: [categoryName], references: [name], onDelete: Cascade)\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"review","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"student","kind":"object","type":"StudentProfile","relationName":"StudentProfileRelation"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"}],"dbName":null},"StudentProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"department","kind":"scalar","type":"String"},{"name":"FavroiteSubjects","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"StudentProfileRelation"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"subjects","kind":"scalar","type":"String"},{"name":"availability","kind":"scalar","type":"Json"},{"name":"categoryName","kind":"scalar","type":"String"},{"name":"review","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// prisma/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StudentProfileScalarFieldEnum: () => StudentProfileScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Booking: "Booking",
  Category: "Category",
  Review: "Review",
  StudentProfile: "StudentProfile",
  TutorProfile: "TutorProfile"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  status: "status",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  date: "date",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description"
};
var ReviewScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var StudentProfileScalarFieldEnum = {
  id: "id",
  name: "name",
  studentId: "studentId",
  bio: "bio",
  department: "department",
  FavroiteSubjects: "FavroiteSubjects"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  authorId: "authorId",
  bio: "bio",
  hourlyRate: "hourlyRate",
  subjects: "subjects",
  availability: "availability",
  categoryName: "categoryName"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// prisma/generated/prisma/enums.ts
var UserRole = {
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
  ADMIN: "ADMIN"
};

// prisma/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var globalForPrisma = globalThis;
var connectionString = process.env.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://skillbridge-two-flame.vercel.app"
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/modules/tutor/tutor.router.ts
import express from "express";

// src/modules/tutor/tutor.service.ts
var getTutor = async (search, rating, price, categoryName) => {
  console.log(search);
  const tutors = await prisma.tutorProfile.findMany({
    where: {
      AND: [
        ...search ? [{ subjects: { hasSome: [search] } }] : [],
        ...price ? [{ hourlyRate: { lte: price } }] : [],
        ...rating ? [
          {
            review: {
              some: {
                rating: { gte: rating }
              }
            }
          }
        ] : [],
        ...categoryName ? [{ category: { name: categoryName } }] : []
      ]
    },
    include: {
      category: true,
      user: true,
      review: {
        select: {
          rating: true
        }
      },
      _count: {
        select: {
          review: true
        }
      }
    }
  });
  const result = tutors.map((tutor) => {
    const avg = tutor.review.length > 0 ? tutor.review.reduce((sum, r) => sum + r.rating, 0) / tutor.review.length : 0;
    return {
      ...tutor,
      avgRating: Number(avg.toFixed(1))
    };
  });
  return result;
};
var postTutor = async (payload, id) => {
  const result = await prisma.tutorProfile.create({
    data: { ...payload, authorId: id }
  });
  return result;
};
var getTutorById = async (id) => {
  const tutor = await prisma.tutorProfile.findFirst({
    where: {
      id
    },
    include: {
      category: true,
      user: true,
      review: {
        select: {
          rating: true
        }
      },
      _count: {
        select: {
          review: true
        }
      }
    }
  });
  const avg = tutor?.review.length > 0 ? tutor.review.reduce((sum, r) => sum + r.rating, 0) / tutor.review.length : 0;
  return {
    ...tutor,
    avgRating: Number(avg.toFixed(1))
  };
};
var putTutorAvilability = async (payload, userId) => {
  const result = await prisma.tutorProfile.update({
    where: {
      authorId: userId
    },
    data: {
      availability: payload.availability
    }
  });
  return result;
};
var putTutorProfile = async (payload, userId) => {
  const result = await prisma.tutorProfile.update({
    where: {
      authorId: userId
    },
    data: { ...payload }
  });
  return result;
};
var tutorService = {
  getTutor,
  getTutorById,
  postTutor,
  putTutorAvilability,
  putTutorProfile
};

// src/modules/tutor/tutor.controller.ts
var getTutor2 = async (req, res, next) => {
  try {
    const { search, rating, price, category } = req.query;
    const searchString = typeof search === "string" ? search : "";
    const categoryName = typeof category === "string" ? category : "";
    const ratingNumber = typeof rating === "string" && !isNaN(Number(rating)) ? Number(rating) : 0;
    const priceNumber = typeof price === "string" && !isNaN(Number(price)) ? Number(price) : 0;
    const result = await tutorService.getTutor(
      searchString,
      ratingNumber,
      priceNumber,
      categoryName
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No tutor data found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Required data fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var postTutor2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("unauthorized");
    }
    const result = await tutorService.postTutor(req.body, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor Data has not created"
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor Data has created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getTutorById2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.send("No Id provide");
    }
    const result = await tutorService.getTutorById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor info not get"
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor profile info got successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var putTutorAvilability2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Unathorized");
    }
    const result = await tutorService.putTutorAvilability(req.body, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not update"
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var putTutorProfile2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.send("Unathorized");
    }
    const result = await tutorService.putTutorProfile(req.body, req.user.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not update."
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var tutorController = {
  getTutor: getTutor2,
  getTutorById: getTutorById2,
  postTutor: postTutor2,
  putTutorAvilability: putTutorAvilability2,
  putTutorProfile: putTutorProfile2
};

// src/middleware/auth.ts
var auth2 = (...Roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      console.log(session);
      if (!session) {
        return res.status(401).json({
          success: false,
          message: " You are Not authorized."
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role || ""
      };
      if (!Roles.length && Roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources."
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

// src/modules/tutor/tutor.router.ts
var router = express.Router();
router.get("/", tutorController.getTutor);
router.get("/:id", tutorController.getTutorById);
router.post("/profile", auth2(UserRole.TUTOR), tutorController.postTutor);
router.put("/profile", auth2(UserRole.TUTOR), tutorController.putTutorProfile);
router.put("/availability", auth2(UserRole.TUTOR), tutorController.putTutorAvilability);
var tutorRoute = router;

// src/modules/booking/booking.router.ts
import express2 from "express";

// src/modules/booking/booking.service.ts
var getBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          user: true
        }
      }
    }
  });
  return result;
};
var getBookingById = async (id) => {
  const result = await prisma.booking.findFirst({
    where: {
      id
    }
  });
  return result;
};
var postBooking = async (payload, userid) => {
  const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      id: payload.tutorId
    }
  });
  console.log("tutor profile", tutorProfile);
  const result = await prisma.booking.create({
    data: {
      date: payload.date,
      status: payload.status,
      studentId: userid,
      tutorId: payload.tutorId
    }
  });
  console.log("booking create ", result);
  return result;
};
var bookingService = {
  getBooking,
  postBooking,
  getBookingById
};

// src/modules/booking/booking.controller.ts
var getBooking2 = async (req, res, next) => {
  try {
    const result = await bookingService.getBooking();
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Booking has not got"
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking Data fetch Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getBookingById2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send("No ID");
    }
    const result = await bookingService.getBookingById(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Booking data has not got"
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking data has got Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var postBooking2 = async (req, res, next) => {
  try {
    const bookingInfo = req.body;
    console.log(bookingInfo);
    if (!req.user) {
      return res.send("Unauthorized");
    }
    const result = await bookingService.postBooking(bookingInfo, req.user.id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Review has not created"
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking Data has created Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var bookingController = {
  getBooking: getBooking2,
  postBooking: postBooking2,
  getBookingById: getBookingById2
};

// src/modules/booking/booking.router.ts
var router2 = express2.Router();
router2.get("/", bookingController.getBooking);
router2.get("/:id", bookingController.getBookingById);
router2.post("/", auth2(UserRole.STUDENT), bookingController.postBooking);
var bookingRoute = router2;

// src/modules/review/review.router.ts
import express3 from "express";

// src/modules/review/review.service.ts
var getReview = async () => {
  const result = await prisma.review.findMany();
  return result;
};
var getReviewById = async (id) => {
  console.log("service", id);
  const result = await prisma.review.findMany({
    where: {
      tutorId: id
    },
    include: {
      student: true
    }
  });
  return result;
};
var postReview = async (payload, userid) => {
  const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      id: payload.tutorId
    }
  });
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      studentId: userid,
      tutorId: payload.tutorId
    }
  });
  return result;
};
var reviewsService = {
  getReview,
  postReview,
  getReviewById
};

// src/modules/review/review.controller.ts
var getReview2 = async (req, res, next) => {
  try {
    const result = await reviewsService.getReview();
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Review has not got"
      });
    }
    res.status(200).json({
      success: true,
      message: "Review Data fetch Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviewById2 = async (req, res, next) => {
  try {
    if (!req.params) {
      return res.send("id not provide");
    }
    const id = req.params.id;
    const result = await reviewsService.getReviewById(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Review has not got"
      });
    }
    res.status(200).json({
      success: true,
      message: "Review Data fetch Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var postReview2 = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    if (!req.user) {
      return res.send("unauthorized");
    }
    const result = await reviewsService.postReview(req.body, req.user.id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Review has not created"
      });
    }
    res.status(201).json({
      success: true,
      message: "Review Data has created Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var reviewsController = {
  getReview: getReview2,
  postReview: postReview2,
  getReviewById: getReviewById2
};

// src/modules/review/review.router.ts
var router3 = express3.Router();
router3.post("/", auth2(UserRole.STUDENT), reviewsController.postReview);
router3.get("/", reviewsController.getReview);
router3.get("/:id", reviewsController.getReviewById);
var reviewsRoute = router3;

// src/modules/admin/admin.router.ts
import express4 from "express";

// src/modules/admin/admin.service.ts
var getUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var getUsersById = async (id) => {
  const result = await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      student: true,
      booking: true,
      tutor: true
    }
  });
  return result;
};
var patchUsersById = async (payload) => {
  const result = await prisma.user.update({
    where: {
      id: payload.id
    },
    data: {
      status: payload.status
    }
  });
  return result;
};
var getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [users, totalUser, bookings, totalBooking, totalCategory] = await Promise.all([
      await tx.user.findMany({ orderBy: { createdAt: "desc" } }),
      await tx.user.count(),
      await tx.booking.findMany({ include: { student: true, tutor: true }, orderBy: { createdAt: "desc" } }),
      await tx.booking.count(),
      await tx.category.count()
    ]);
    return {
      users,
      totalUser,
      bookings,
      totalBooking,
      totalCategory
    };
  });
};
var userService = {
  getUsers,
  getUsersById,
  getStats,
  patchUsersById
};

// src/modules/admin/admin.controller.ts
var getUsers2 = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users Data fetch Successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error",
      error
    });
  }
};
var getUsersById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send("No Id");
    }
    const result = await userService.getUsersById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not update"
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error",
      error
    });
  }
};
var patchUsersById2 = async (req, res, next) => {
  try {
    const result = await userService.patchUsersById(req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not update"
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getStats2 = async (req, res, next) => {
  try {
    const result = await userService.getStats();
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Stats Data not fetch"
      });
    }
    res.status(200).json({
      success: true,
      message: "Stats Data fetch successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var userController = {
  getUsers: getUsers2,
  getUsersById: getUsersById2,
  getStats: getStats2,
  patchUsersById: patchUsersById2
};

// src/modules/admin/admin.router.ts
var router4 = express4.Router();
router4.get("/users", auth2(UserRole.ADMIN), userController.getUsers);
router4.get("/users/:id", auth2(UserRole.ADMIN, UserRole.STUDENT), userController.getUsersById);
router4.patch("/users/:id", auth2(UserRole.ADMIN, UserRole.STUDENT), userController.patchUsersById);
router4.get("/stats", auth2(UserRole.ADMIN), userController.getStats);
var userRoute = router4;

// src/middleware/notFound.ts
var notFound = (req, res) => {
  return res.status(400).json({
    message: "Route Not Found!",
    path: req.originalUrl,
    date: Date()
  });
};

// src/middleware/globalErrorHandler.ts
var errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = error;
  if (error instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields";
  } else if (error instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}";
    } else if (error.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate Key found";
    } else if (error.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key contraint error";
    }
  } else if (error instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occured during query execution";
  } else if (error instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (error.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your credentails";
    } else if (error.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach to database.";
    }
  }
  res.status(statusCode).json({
    statusCode,
    message: errorMessage,
    error: errorDetails
  });
};
var globalErrorHandler_default = errorHandler;

// src/modules/categories/categories.router.ts
import express5 from "express";

// src/modules/categories/categories.service.ts
var getCategory = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tutors: true
        }
      }
    }
  });
  return result;
};
var postCategory = async (payload) => {
  const result = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description
    }
  });
  return result;
};
var deleteCategory = async (id) => {
  const result = await prisma.category.delete({
    where: {
      id
    }
  });
  return result;
};
var CategoriesService = {
  getCategory,
  postCategory,
  deleteCategory
};

// src/modules/categories/categories.controller.ts
var getCategory2 = async (req, res, next) => {
  try {
    const result = await CategoriesService.getCategory();
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Category has not got"
      });
    }
    res.status(200).json({
      success: true,
      message: "Category Data fetch Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var postCategory2 = async (req, res, next) => {
  try {
    const result = await CategoriesService.postCategory(req.body);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Category has not created"
      });
    }
    res.status(201).json({
      success: true,
      message: "Category Data has created Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    if (!req.params) {
      return res.send("there is not id provided");
    }
    const { id } = req.params;
    const result = await CategoriesService.deleteCategory(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Category has not deleted"
      });
    }
    res.status(201).json({
      success: true,
      message: "Category Data has deleted Successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var categoriesController = {
  getCategory: getCategory2,
  postCategory: postCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/categories/categories.router.ts
var router5 = express5.Router();
router5.get("/", categoriesController.getCategory);
router5.post("/", categoriesController.postCategory);
router5.delete("/:id", auth2(UserRole.ADMIN), categoriesController.deleteCategory);
var categoriesRoute = router5;

// src/app.ts
var app = express6();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://skillbridge-two-flame.vercel.app"
    ],
    credentials: true
  })
);
app.use(express6.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  return res.json(session);
});
app.use("/api/tutors", tutorRoute);
app.use("/api/tutor", tutorRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/admin", userRoute);
app.get("/", (req, res) => {
  res.send("Hello, Skill Bridge World!");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
