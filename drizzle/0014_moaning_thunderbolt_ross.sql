CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`quizId` int NOT NULL,
	`certificateNumber` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`issueDate` timestamp NOT NULL DEFAULT (now()),
	`expiryDate` timestamp,
	`pdfUrl` text,
	`verificationCode` varchar(64) NOT NULL,
	`issuedBy` varchar(255) NOT NULL DEFAULT 'Rivercrest Free Methodist Church',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_certificateNumber_unique` UNIQUE(`certificateNumber`),
	CONSTRAINT `certificates_verificationCode_unique` UNIQUE(`verificationCode`)
);
