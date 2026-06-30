ALTER TABLE "groups" RENAME TO "teams";
ALTER TABLE "group_members" RENAME TO "team_members";

ALTER TABLE "team_members" RENAME COLUMN "group_id" TO "team_id";

CREATE TABLE "notifications" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "team_id" UUID,
  "contest_id" UUID,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "is_read" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
  CONSTRAINT "notifications_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE,
  CONSTRAINT "notifications_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE,
  CONSTRAINT "notifications_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "contests"("id") ON DELETE CASCADE
);

CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

ALTER TABLE "contests" RENAME COLUMN "group_id" TO "team_id";
ALTER TABLE "contests" ADD COLUMN "is_team_mode" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "contest_participants" ADD COLUMN "wrong_attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "contest_participants" ADD COLUMN "penalty_time" INTEGER NOT NULL DEFAULT 0;
