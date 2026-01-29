/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentRating` to the `tutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tutorProfile" ADD COLUMN     "reviewId" TEXT,
ADD COLUMN     "studentRating" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "tutorProfile" ADD CONSTRAINT "tutorProfile_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
