CREATE TABLE `quiz_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionId` int NOT NULL,
	`answerText` text NOT NULL,
	`answerTextSwahili` text,
	`isCorrect` int DEFAULT 0,
	`order` int DEFAULT 0,
	`explanation` text,
	`explanationSwahili` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quizId` int NOT NULL,
	`questionText` text NOT NULL,
	`questionTextSwahili` text,
	`questionType` varchar(50) DEFAULT 'multiple_choice',
	`order` int DEFAULT 0,
	`points` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizId` int NOT NULL,
	`score` int DEFAULT 0,
	`passed` int DEFAULT 0,
	`totalPoints` int DEFAULT 0,
	`earnedPoints` int DEFAULT 0,
	`timeSpent` int,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`videoId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleSwahili` varchar(255),
	`description` text,
	`descriptionSwahili` text,
	`passingScore` int DEFAULT 70,
	`timeLimit` int,
	`isPublished` int DEFAULT 1,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_quiz_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quizResultId` int NOT NULL,
	`questionId` int NOT NULL,
	`selectedAnswerId` int,
	`isCorrect` int DEFAULT 0,
	`pointsEarned` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_quiz_answers_id` PRIMARY KEY(`id`)
);
