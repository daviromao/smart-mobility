/*
  Warnings:

  - You are about to drop the `Bus` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('BUS', 'SUBWAY_ROOM', 'SUBWAY_TRAIN');

-- DropTable
DROP TABLE "Bus";

-- CreateTable
CREATE TABLE "Resource" (
    "id" INTEGER NOT NULL,
    "uri" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "collect_interval" INTEGER,
    "description" TEXT,
    "uuid" TEXT NOT NULL,
    "city" TEXT,
    "neighborhood" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "capabilities" TEXT[],
    "air_activated" BOOLEAN,
    "air_mode" "AirMode" NOT NULL DEFAULT 'AUTOMATIC',
    "type" "ResourceType" NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_key" ON "Resource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_uuid_key" ON "Resource"("uuid");
