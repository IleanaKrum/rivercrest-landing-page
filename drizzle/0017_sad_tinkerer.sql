CREATE TABLE `prayer_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`prayerCategory` enum('church_planting','leadership_development','refugee_support','community_outreach','missions','healing','family','other') NOT NULL DEFAULT 'other',
	`prayerRequest` text NOT NULL,
	`isPublic` int NOT NULL DEFAULT 0,
	`status` enum('new','acknowledged','praying','answered') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prayer_requests_id` PRIMARY KEY(`id`)
);
