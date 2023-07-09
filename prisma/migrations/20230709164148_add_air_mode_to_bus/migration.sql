-- CreateEnum
CREATE TYPE "AirMode" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "air_mode" "AirMode" NOT NULL DEFAULT 'AUTOMATIC';
