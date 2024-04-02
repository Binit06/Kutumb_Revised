-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('USER', 'NGO', 'SPONSOR');

-- CreateEnum
CREATE TYPE "VERSTATUS" AS ENUM ('NOTVERIFIED', 'PENDING', 'VERIFIED');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'USER',
    "location" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "verificaion" "VERSTATUS" NOT NULL DEFAULT 'NOTVERIFIED',
    "org_mail" TEXT NOT NULL,
    "org_key" TEXT,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrganisationToUserProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_org_name_key" ON "Organisation"("org_name");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_org_id_key" ON "Organisation"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganisationToUserProfile_AB_unique" ON "_OrganisationToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganisationToUserProfile_B_index" ON "_OrganisationToUserProfile"("B");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganisationToUserProfile" ADD CONSTRAINT "_OrganisationToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganisationToUserProfile" ADD CONSTRAINT "_OrganisationToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
