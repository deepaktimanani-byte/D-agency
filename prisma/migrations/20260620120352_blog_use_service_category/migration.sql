-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
