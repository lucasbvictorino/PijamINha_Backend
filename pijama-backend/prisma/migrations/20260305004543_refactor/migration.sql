/*
  Warnings:

  - You are about to drop the column `saleId` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_saleId_fkey";

-- DropIndex
DROP INDEX "addresses_saleId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "saleId";

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
