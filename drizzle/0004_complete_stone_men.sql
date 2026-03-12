CREATE TABLE `course_registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`userId` int,
	`studentName` varchar(255) NOT NULL,
	`studentEmail` varchar(320) NOT NULL,
	`studentPhone` varchar(20),
	`country` varchar(100) NOT NULL,
	`state` varchar(100),
	`wantsPrintedMaterials` int DEFAULT 0,
	`printedMaterialsCost` int DEFAULT 0,
	`paymentStatus` enum('pending','received','not_required') DEFAULT 'pending',
	`paymentDate` timestamp,
	`registrationDate` timestamp NOT NULL DEFAULT (now()),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_registrations_id` PRIMARY KEY(`id`)
);
