CREATE TABLE `video_subtitles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`videoId` int NOT NULL,
	`language` varchar(10) NOT NULL,
	`languageName` varchar(50) NOT NULL,
	`subtitleUrl` text NOT NULL,
	`isDefault` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_subtitles_id` PRIMARY KEY(`id`)
);
