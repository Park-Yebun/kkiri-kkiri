CREATE DATABASE kkirikkiri;

CREATE TABLE `bookshelf` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `story_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `bookshelf_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  CONSTRAINT `bookshelf_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `story_id` bigint(20) DEFAULT NULL,
  `line_id` int(11) DEFAULT NULL,
  `korean_sentence` varchar(2000) DEFAULT NULL,
  `translated_sentence` varchar(2000) DEFAULT NULL,
  `image_description` varchar(2000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `male_voice_url` varchar(255) DEFAULT NULL,
  `female_voice_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `content_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1565 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `learning` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `story_id` bigint(20) NOT NULL,
  `writing_line_no` int(11) DEFAULT 0,
  `speaking_line_no` int(11) DEFAULT 0,
  `writing_cplt_no` int(11) DEFAULT 0,
  `speaking_cplt_no` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `learning_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  CONSTRAINT `learning_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_id` varchar(10) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nickname` varchar(30) NOT NULL,
  `age` int(11) NOT NULL,
  `level` enum('BEGINNER','INTERMEDIATE','ADVANCED') NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `story` (
  `story_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `title` varchar(127) DEFAULT NULL,
  `summary` varchar(511) DEFAULT NULL,
  `open_state` enum('PRIVATE','PUBLIC') NOT NULL DEFAULT 'PRIVATE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`story_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=585 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



