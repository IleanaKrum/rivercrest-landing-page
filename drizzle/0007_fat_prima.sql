CREATE TABLE `independent_study_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`content` text,
	`contentSwahili` text,
	`category` enum('trinity','scripture','humanity','law_and_love','good_works','christ_sacrifice','new_life','sanctification','restoration','church','worship','sacraments') NOT NULL,
	`language` varchar(50) DEFAULT 'English',
	`order` int DEFAULT 0,
	`estimatedHours` int DEFAULT 1,
	`isPublished` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `independent_study_modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `module_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`trackId` int NOT NULL,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`isCompleted` int DEFAULT 0,
	`progressPercentage` int DEFAULT 0,
	`notes` text,
	`certificateIssued` int DEFAULT 0,
	`certificateIssuedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `module_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `track_module_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trackId` int NOT NULL,
	`moduleId` int NOT NULL,
	`isRequired` int DEFAULT 0,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `track_module_links_id` PRIMARY KEY(`id`)
);
