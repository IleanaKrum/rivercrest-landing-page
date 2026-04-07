CREATE TABLE `forum_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`threadId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`isApproved` int DEFAULT 1,
	`isDeleted` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forum_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forum_threads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`isApproved` int DEFAULT 1,
	`isDeleted` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forum_threads_id` PRIMARY KEY(`id`)
);
