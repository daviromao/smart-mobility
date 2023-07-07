-- CreateTable
CREATE TABLE "Bus" (
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

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_id_key" ON "Bus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_uuid_key" ON "Bus"("uuid");
