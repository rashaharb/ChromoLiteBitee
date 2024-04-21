/*
  Warnings:

  - Added the required column `calories` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteins` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "calories" TEXT NOT NULL,
ADD COLUMN     "carbs" TEXT NOT NULL,
ADD COLUMN     "fat" TEXT NOT NULL,
ADD COLUMN     "proteins" TEXT NOT NULL;
