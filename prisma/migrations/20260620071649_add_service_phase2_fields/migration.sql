-- AlterTable
ALTER TABLE "services" ADD COLUMN     "faqs" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "pricing" TEXT,
ADD COLUMN     "targetAudience" TEXT,
ADD COLUMN     "timeline" TEXT;
