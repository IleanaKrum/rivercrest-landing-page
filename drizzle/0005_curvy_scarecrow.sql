CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('book','syllabus','guideline','article','other') NOT NULL,
	`language` varchar(50) DEFAULT 'English',
	`fileUrl` varchar(512) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int,
	`author` varchar(255),
	`publishDate` timestamp,
	`isPublished` int DEFAULT 1,
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
