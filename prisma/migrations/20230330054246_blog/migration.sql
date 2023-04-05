/*
  Warnings:

  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sectionId` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sectionId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "sectionId",
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP CONSTRAINT "Section_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "otherId" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Section_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
