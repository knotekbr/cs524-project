-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('created', 'in_progress', 'paused', 'ended');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'created';

-- CreateTable
CREATE TABLE "GameInvite" (
    "gameId" INTEGER NOT NULL,
    "invitedEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameInvite_pkey" PRIMARY KEY ("gameId","invitedEmail")
);

-- CreateTable
CREATE TABLE "GameCategory" (
    "gameId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "GameCategory_pkey" PRIMARY KEY ("gameId","categoryId")
);

-- AddForeignKey
ALTER TABLE "GameInvite" ADD CONSTRAINT "GameInvite_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCategory" ADD CONSTRAINT "GameCategory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCategory" ADD CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AnswerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
