/*
  Warnings:

  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sectionId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "sectionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Section" DROP CONSTRAINT "Section_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Section_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Section_id_seq";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
