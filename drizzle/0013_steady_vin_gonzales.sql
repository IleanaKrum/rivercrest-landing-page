CREATE TABLE `video_completions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`videoId` int NOT NULL,
	`moduleId` int NOT NULL,
	`watchedDuration` int NOT NULL DEFAULT 0,
	`totalDuration` int NOT NULL DEFAULT 0,
	`isCompleted` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `video_completions_id` PRIMARY KEY(`id`)
);
