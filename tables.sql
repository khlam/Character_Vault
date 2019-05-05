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
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
  );

LOCK TABLES `race` WRITE;
INSERT INTO `race` VALUES ('Dwarf', 'A shorty, just dont mess with the beard');
INSERT INTO `race` VALUES ('Human', 'Average Joe Shmoe');
UNLOCK TABLES;

CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `alignment` varchar(255) DEFAULT '',
  `armor-class` varchar(255),
  `initiative` int(11) DEFAULT '0',
  `speed` int(11) DEFAULT '0',
  `healthpoints` int(11) DEFAULT '0',
  `inspiration` int(11) DEFAULT '0',
  `strength` int(11) DEFAULT '0',
  `dexterity` int(11) DEFAULT '0',
  `constitution` int(11) DEFAULT '0',
  `intelligence` int(11) DEFAULT '0',
  `wisdom` int(11) DEFAULT '0',
  `charisma` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `characters-1` FOREIGN KEY (`race_id`) REFERENCES `race` (`name`) ON DELETE CASCADE
);

LOCK TABLES `characters` WRITE;
INSERT INTO `characters` VALUES (NULL, 'Human', 'High-Prophet Chad, the Rust Developer', 'Alpha Male', 'Chaotic Good', 'plate', 99, 99, 99, 99, 99, 99, 99, 99, 99, 99);
INSERT INTO `characters` VALUES (NULL, 'Dwarf', 'Looser Paul, the Virgin C++ Coder', 'Beta-Cuck', 'No One Cares', 'cloth', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
UNLOCK TABLES;

CREATE TABLE `class` (
  `name` varchar(255) NOT NULL,
  `hit_dice` char(11) DEFAULT '0',
  `description` varchar(255),
  PRIMARY KEY (`name`)
);

LOCK TABLES `class` WRITE;
INSERT INTO `class` VALUES ('Holy Paladin', '10', '');
INSERT INTO `class` VALUES ('High Noble', '10', 'Superior beings who commands subordinates to manage their resources for them. Flawless and dynamic. Never falters. Hearlds of the future, beloved by all.');
INSERT INTO `class` VALUES ('Peasant', '10', '');
UNLOCK TABLES;

CREATE TABLE `character_class` (
  `character_id` int(11) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  PRIMARY KEY (`character_id`, `class_id`),
  CONSTRAINT `character_class-1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE,
  CONSTRAINT `character_class-2` FOREIGN KEY (`class_id`) REFERENCES `class` (`name`) ON DELETE CASCADE
);

LOCK TABLES `character_class` WRITE;
INSERT INTO `character_class` VALUES ('1', 'High Noble');
INSERT INTO `character_class` VALUES ('1', 'Holy Paladin');
INSERT INTO `character_class` VALUES ('2', 'Peasant');
UNLOCK TABLES;


/*
  CREATE TABLE `class_feature` (
  );

  CREATE TABLE `feature` (
  );

  CREATE TABLE `character_skill` (
  );

  CREATE TABLE `skill` (
  );

 */
