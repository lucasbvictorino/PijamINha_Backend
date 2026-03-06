/*
  Warnings:

  - Changed the type of `size` on the `pajama_sizes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PAJAMA_SIZE" AS ENUM ('PP', 'P', 'M', 'G', 'GG');

-- AlterTable
ALTER TABLE "pajama_sizes" DROP COLUMN "size",
ADD COLUMN     "size" "PAJAMA_SIZE" NOT NULL;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "totalPajamas" DROP DEFAULT;
