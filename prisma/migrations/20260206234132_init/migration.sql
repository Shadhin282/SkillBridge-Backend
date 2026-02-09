-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
