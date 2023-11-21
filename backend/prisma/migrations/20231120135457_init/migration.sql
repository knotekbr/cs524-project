-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "GameEventType" AS ENUM ('game_created', 'game_started', 'game_paused', 'game_restarted', 'game_ended', 'player_joined', 'player_left', 'answer_chosen', 'response_chosen', 'scores_updated');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "saltedPassword" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameEvent" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventType" "GameEventType" NOT NULL,
    "eventDetails" TEXT,

    CONSTRAINT "GameEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayer" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GamePlayer_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateTable
CREATE TABLE "AnswerCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "AnswerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerPrompt" (
    "id" SERIAL NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "correctResponse" TEXT NOT NULL,
    "otherResponses" TEXT[],

    CONSTRAINT "AnswerPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEvent" ADD CONSTRAINT "GameEvent_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEvent" ADD CONSTRAINT "GameEvent_gameId_userId_fkey" FOREIGN KEY ("gameId", "userId") REFERENCES "GamePlayer"("gameId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerPrompt" ADD CONSTRAINT "AnswerPrompt_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AnswerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
