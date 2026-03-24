CREATE TABLE `admin_approvers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`isActive` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_approvers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `applications` ADD `candidateEmail` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `candidatePhone` varchar(20);--> statement-breakpoint
ALTER TABLE `applications` ADD `approvedBy` int;--> statement-breakpoint
ALTER TABLE `applications` ADD `approvedAt` timestamp;--> statement-breakpoint
ALTER TABLE `applications` ADD `rejectionReason` text;