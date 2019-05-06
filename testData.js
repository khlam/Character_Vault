module.exports = {
    characterData:[
        {
            id: 1,
            race_id: 'Human',
            name: 'Ralth',
            gender: 'Male',
            alignment: 'Lawful Good',
            healthpoints: 20,
            strength: 12,
            dexterity: 14,
            constitution: 11,
            intelligence: 15,
            wisdom: 8,
            charisma: 13
        },
        {
            id: 2,
            race_id: 'Dwarf',
            name: 'Ruby',
            gender: 'Female',
            alignment: 'Neutral Good',
            healthpoints: 11,
            strength: 14,
            dexterity: 11,
            constitution: 16,
            intelligence: 10,
            wisdom: 14,
            charisma: 9
        }
    ],
    raceData:[
        {
            name: 'Human',
            description: 'Your average joe Shmoe.'
        },
        {
            name: 'Dwarf',
            description: 'Short and squate, just dont mess with the beard!!!'
        }
    ],
    classData:[
        {
            name: 'Paladin',
            hit_dice: 'd10',
            description: 'Holy Warrior, smiteing evil where ever it my be.'
        },
        {
            name: 'Mage',
            hit_dice: 'd6',
            description: 'Holy Warrior, smiteing evil where ever it my be.'
        },
        {
            name: 'Fighter',
            hit_dice: 'd10',
            description: 'All around warrior, trained in the art of combat.'
        }
    ],
    skillData:[
        {
            name: 'Stealth',
            description: 'You ability to hide from others.'
        },
        {
            name: 'Athletics',
            description: 'Your ability to jump, climb, and perform other feats of Athleticism.'
        },
        {
            name: 'Spell Craft',
            description: 'Your ability to learn and identify new spells.'
        }
    ],
    characterClassData:[
        {
            character_id: 1,
            class_id: 'Fighter',
            level: 1
        },
        {
            character_id: 1,
            class_id: 'Paladin',
            level: 1
        },
        {
            character_id: 2,
            class_id: 'Mage',
            level: 2
        }
    ],
    characterSkillData:[
        {
            character_id: 1,
            skill_id: 'Athletics'
        },
        {
            character_id: 2,
            skill_id: 'Stealth'
        },
        {
            character_id: 2,
            skill_id: 'Spell Craft'
        }
    ],
};
