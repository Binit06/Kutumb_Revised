/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organisation_user_id_key" ON "Organisation"("user_id");
