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

-- Insert a new Skill
INSERT INTO skill (name, description) VALUES (:skill_name_text_input, :description_text_input)

-- Insert a new Race
INSERT INTO race (name, description) VALUES (:race_name_text_input, :description_text_input)

-- Insert a new Class
INSERT INTO class (name, hit_dice, description) VALUES (:class_name_text_input, :hit_dice_dropdown, :description_text_input)

-- Delete a Character
DELETE FROM characters WHERE id = :character_id_selection

-- Update a character's information
UPDATE characters SET name = :nameInput, race_id = :race_selection_dropdown, gender = :gender_dropdown, alignment = :alignment_dropdown, healthpoints = :healthpoints_input, strength = :strength_input, dexterity = :dexterity_input, constitution = :constitution_input, intelligence = :intelligence_input,  wisdom = :wisdom_input, charisma = :charisma_input WHERE name = :nameInput;

-- Searching <table> for some <string>
SELECT * FROM :dbName WHERE :searchCols LIKE :queryString

-- Add-form
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = :HTTP_REFERER AND COLUMN_NAME NOT LIKE :id;

-- Update table generic
UPDATE :table SET :column_name WHERE id = :itemID