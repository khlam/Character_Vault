-- get all characters in the DnD Database along with their stats.
SELECT name, race_id, gender, alignment, armor_class, initiative, speed, healthpoints, inspiration, strength, dexterity, constitution, intelligence, wisdom, charisma FROM characters;

-- get a character's race and their race's description.
SELECT characters.name, race.name, description FROM characters INNER JOIN race ON race.name = characters.race_id;

-- get all class information about all characters
SELECT characters.name, class.name, level, hit_dice, description FROM characters INNER JOIN character_class ON character_class.character_id = characters.id INNER JOIN class ON character_class.class_id = class.name;

