-- get all characters in the DnD Database along with their stats.
SELECT name, race_id, gender, alignment, healthpoints, strength, dexterity, constitution, intelligence, wisdom, charisma FROM characters;

-- get a character's race and their race's description.
SELECT characters.name, race.name, description FROM characters INNER JOIN race ON race.name = characters.race_id;

-- get all class information about all characters
SELECT characters.name, class.name, level, hit_dice, description FROM characters INNER JOIN character_class ON character_class.character_id = characters.id INNER JOIN class ON character_class.class_id = class.name;

-- get all character's skills
SELECT characters.name, skill.name, skill.description FROM characters INNER JOIN character_skill ON character_skill.character_id = characters.id INNER JOIN skill ON character_skill.skill_id = skill.name;

-- Insert a new character
INSERT INTO characters (name, race_id, gender, alignment, healthpoints, strength, dexterity, constitution, intelligence, wisdom, charisma) VALUES (:nameInput, :race_selection_dropdown, :gender_dropdown, :alignment_dropdown, :healthpoints_input, :strength_input, :dexterity_input, :constitution_input, :intelligence_input, :wisdom_input, :charisma_input)

-- Associate a character with multiple classes (m-to-m relationship)
INSERT INTO character_class (character_id, class_id, level) VALUES (:character_id_selection_dropdown, :class_id_selection_dropdown, :level_input)

-- Associate a character with multiple skills (m-to-m relationship)
INSERT INTO character_skill (character_id, skill_id) VALUES (:character_id_selection_dropdown, :skill_name_selection_dropdown)

-- Delete a character
DELETE FROM characters WHERE id = :character_id_selection