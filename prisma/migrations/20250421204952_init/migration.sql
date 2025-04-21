-- CreateTable
CREATE TABLE "menu_item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Menu_item_pkey" PRIMARY KEY ("id")
);
