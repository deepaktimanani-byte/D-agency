-- AlterTable
ALTER TABLE "success_stories" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
