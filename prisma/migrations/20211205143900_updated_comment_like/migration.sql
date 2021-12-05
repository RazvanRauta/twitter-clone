/*
  Warnings:

  - Added the required column `user_id` to the `commentLikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commentLikes" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "commentLikes" ADD CONSTRAINT "commentLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
