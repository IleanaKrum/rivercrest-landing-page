CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`trackId` int NOT NULL,
	`candidateName` varchar(255) NOT NULL,
	`candidateAddress` text,
	`churchName` varchar(255) NOT NULL,
	`leadPastorName` varchar(255) NOT NULL,
	`recommendationLetterUrl` varchar(512),
	`essay` text,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`sessionNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`topics` text,
	`assignments` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trackId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`syllabus` text,
	`sessionsCount` int DEFAULT 0,
	`commitmentHours` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`applicationId` int,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`status` enum('enrolled','in_progress','completed') DEFAULT 'enrolled',
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`enrollmentId` int NOT NULL,
	`sessionId` int NOT NULL,
	`completed` int DEFAULT 0,
	`completedAt` timestamp,
	`notes` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_tracks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_tracks_id` PRIMARY KEY(`id`)
);
