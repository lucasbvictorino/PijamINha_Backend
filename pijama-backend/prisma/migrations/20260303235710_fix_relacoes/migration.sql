/*
  Warnings:

  - You are about to drop the column `addressId` on the `sales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[saleId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `saleId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_userId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_addressId_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "saleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "feedbacks" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_saleId_key" ON "addresses"("saleId");

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
