-- has to be droped prior to class and character
DROP TABLE IF EXISTS `character_class`;
-- has to be droped prior to class and feature
DROP TABLE IF EXISTS `class_feature`;
-- has to be droped prior to characters and skill
DROP TABLE IF EXISTS `character_skill`;
DROP TABLE IF EXISTS `class`;
DROP TABLE IF EXISTS `characters`;
DROP TABLE IF EXISTS `feature`;
DROP TABLE IF EXISTS `skill`;
DROP TABLE IF EXISTS `race`;

CREATE TABLE `race` (
  `name` varchar(255) NOT NULL, -- TODO: change schema to reflect diffrence
  `description` varchar(255) NOT NULL, -- TODO: change schema to reflect diffrence
  PRIMARY KEY (`name`)
  );

LOCK TABLES `race` WRITE;
INSERT INTO `race` VALUES ('Dwarf', 'A shorty, just dont mess with the beard');
INSERT INTO `race` VALUES ('Human', 'Average Joe Shmoe');
UNLOCK TABLES;

CREATE TABLE `characters` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `race_id` varchar(255) NOT NULL, -- TODO: change schema to reflect diffrence
  `name` varchar(255) NOT NULL, -- TODO: change schema to reflect diffrence
  `gender` varchar(255) NOT NULL, -- TODO: change schema to reflect diffrence
  `alignment` varchar(255) DEFAULT '', -- TODO: change schema to reflect diffrence
  `armor_class` int (255) DEFAULT '10',
  `initiative` int(255) DEFAULT '0',
  `speed` int(255) DEFAULT '30',
  `healthpoints` int(11) DEFAULT '0',
  `inspiration` boolean DEFAULT false,
  `strength` int(55) DEFAULT '10',
  `dexterity` int(55) DEFAULT '10',
  `constitution` int(55) DEFAULT '10',
  `intelligence` int(55) DEFAULT '10',
  `wisdom` int(55) DEFAULT '10',
  `charisma` int(55) DEFAULT '10',
  PRIMARY KEY (`id`),
  CONSTRAINT `characters-1` FOREIGN KEY (`race_id`) REFERENCES `race` (`name`) ON DELETE CASCADE
);

LOCK TABLES `characters` WRITE;
INSERT INTO `characters` VALUES (NULL, 'Human', 'High-Prophet Chad, the Rust Developer', 'Alpha Male', 'Chaotic Good', 16, 1, DEFAULT, 12, DEFAULT, 15, 12, 14, 8, DEFAULT, 15);
INSERT INTO `characters` VALUES (NULL, 'Dwarf', 'Looser Paul, the Virgin C++ Coder', 'Beta-Cuck', 'No One Cares', NULL, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
UNLOCK TABLES;

CREATE TABLE `class` (
  `name` varchar(255) NOT NULL,
  `hit_dice` char(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
);

LOCK TABLES `class` WRITE;
INSERT INTO `class` VALUES ('Holy Paladin', 'd10', '');
INSERT INTO `class` VALUES ('Noble', 'd8', 'Superior beings who commands subordinates to manage their resources for them. Flawless and dynamic. Never falters. Hearlds of the future, beloved by all.');
INSERT INTO `class` VALUES ('Peasant', 'd4', '');
UNLOCK TABLES;

CREATE TABLE `feature` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `level` int(20) NOT NULL,
  PRIMARY KEY (`name`)
);

LOCK TABLES `feature` WRITE;
INSERT INTO `feature` VALUES ('Lay on Hands', 'Heal the person touched for 1d6 hitpoints per caster level.', 1);
INSERT INTO `feature` VALUES ('Nose Up', 'Makes everyone in the room feel inferior.', 1);
INSERT INTO `feature` VALUES ('Revolt','Cut the head off the reigning monarch.', 2);
UNLOCK TABLES;

CREATE TABLE `skill` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
);

LOCK TABLES `skill` WRITE;
INSERT INTO `skill` VALUES ('Stealth', 'Your ability to hide from others');
INSERT INTO `skill` VALUES ('Perception', 'Your ability to see what is hidden');
UNLOCK TABLES;

CREATE TABLE `character_class` (
  `character_id` int(11) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `level` int(20) NOT NULL DEFAULT '1',
  PRIMARY KEY (`character_id`, `class_id`),
  CONSTRAINT `character_class-1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `character_class-2` FOREIGN KEY (`class_id`) REFERENCES `class` (`name`) ON DELETE CASCADE
);

LOCK TABLES `character_class` WRITE;
INSERT INTO `character_class` VALUES ('1', 'Noble', DEFAULT);
INSERT INTO `character_class` VALUES ('1', 'Holy Paladin', 2);
INSERT INTO `character_class` VALUES ('2', 'Peasant', DEFAULT);
UNLOCK TABLES;

CREATE TABLE `class_feature` (
  `class_id` varchar(255) NOT NULL,
  `feature_id` varchar(255) NOT NULL,
  PRIMARY KEY (`class_id`, `feature_id`),
  CONSTRAINT `class_feature-1` FOREIGN KEY (`class_id`) REFERENCES `class` (`name`) ON DELETE CASCADE,
  CONSTRAINT `class_feature-2` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`name`) ON DELETE CASCADE
);

LOCK TABLES `class_feature` WRITE;
INSERT INTO `class_feature` VALUES ('Holy Paladin', 'Lay on Hands');
INSERT INTO `class_feature` VALUES ('Noble', 'Nose Up');
INSERT INTO `class_feature` VALUES ('Peasant', 'Revolt');
UNLOCK TABLES;

CREATE TABLE `character_skill` (
  `character_id` int(11) NOT NULL,
  `skill_id` varchar(255) NOT NULL,
  PRIMARY KEY (`character_id`, `skill_id`),
  CONSTRAINT `character_skill-1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `character_skill-2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`name`) ON DELETE CASCADE
);

LOCK TABLES `character_skill` WRITE;
INSERT INTO `character_skill` VALUES ('1', 'Perception');
INSERT INTO `character_skill` VALUES ('2', 'Stealth');
UNLOCK TABLES;
