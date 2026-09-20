-- V7.3.0 performance indexes for public portfolio query paths
CREATE INDEX "Project_status_featured_createdAt_idx" ON "Project"("status", "featured", "createdAt");
CREATE INDEX "Skill_category_order_idx" ON "Skill"("category", "order");
CREATE INDEX "Experience_current_startDate_idx" ON "Experience"("current", "startDate");
