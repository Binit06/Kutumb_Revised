-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "est_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "social_url" TEXT,
ADD COLUMN     "web_url" TEXT;
