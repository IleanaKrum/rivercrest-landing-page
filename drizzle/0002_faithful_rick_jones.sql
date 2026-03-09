CREATE TABLE `assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`sessionId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`assignmentType` enum('essay','project','presentation','reflection','other') NOT NULL,
	`dueDate` timestamp,
	`instructions` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`assignmentId` int NOT NULL,
	`enrollmentId` int NOT NULL,
	`userId` int NOT NULL,
	`fileUrl` varchar(512),
	`fileName` varchar(255),
	`fileSize` int,
	`submissionText` text,
	`status` enum('submitted','under_review','graded','returned') DEFAULT 'submitted',
	`grade` varchar(10),
	`feedback` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`gradedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
