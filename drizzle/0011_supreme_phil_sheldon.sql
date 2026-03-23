CREATE TABLE `module_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleSwahili` varchar(255),
	`description` text,
	`descriptionSwahili` text,
	`videoUrl` text NOT NULL,
	`duration` int,
	`lessonNumber` int NOT NULL,
	`order` int DEFAULT 0,
	`isPublished` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `module_videos_id` PRIMARY KEY(`id`)
);
