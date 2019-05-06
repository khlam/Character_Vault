DROP TABLE IF EXISTS `character_skill`; -- has to be droped prior to characters and skill
DROP TABLE IF EXISTS `character_class`; -- has to be droped prior to class and character
DROP TABLE IF EXISTS `characters`;
DROP TABLE IF EXISTS `class`;
DROP TABLE IF EXISTS `skill`;
DROP TABLE IF EXISTS `race`;

CREATE TABLE `race` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
  );

LOCK TABLES `race` WRITE;
INSERT INTO `race` VALUES ('Dwarf', 'A shorty, just dont mess with the beard');
INSERT INTO `race` VALUES ('Human', 'Average Joe Shmoe');
UNLOCK TABLES;

CREATE TABLE `characters` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `race_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `alignment` varchar(255) DEFAULT '',
  `healthpoints` int(11) DEFAULT '0',
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
INSERT INTO `characters` VALUES (NULL, 'Human', 'High-Prophet Chad, the Rust Developer', 'Alpha Male', 'Chaotic Good', 12, 15, 12, 14, 8, DEFAULT, 15);
INSERT INTO `characters` VALUES (NULL, 'Dwarf', 'Looser Paul, the Virgin C++ Coder', 'Beta-Cuck', 'No One Cares', 1, 1, 1, 1, 1, 1, 1);
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
