CREATE TABLE `checklist_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`enrollmentId` int NOT NULL,
	`checklistId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`itemIndex` int NOT NULL,
	`completed` int DEFAULT 0,
	`completedAt` timestamp,
	`notes` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `checklist_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_checklists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`totalWeeks` int DEFAULT 8,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_checklists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weekly_milestones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`checklistId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`phase` varchar(255),
	`title` varchar(255) NOT NULL,
	`description` text,
	`milestones` text,
	`assignments` text,
	`readingMaterials` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `weekly_milestones_id` PRIMARY KEY(`id`)
);
