const { Client, Message } = require('discord.js');
const Level = require('../../models/level');
const calculateLevelXP = require('../../utils/calculateLevelXP');

const cooldowns = new Set();

function getRandomXP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return; //Check various things

    const xpToGive = getRandomXP(5, 15); //Calculate random xp to give

    const query = {
        userID: message.author.id, //Query for mongodb
        guildID: message.guild.id
    };

    try {
        const level = await Level.findOne(query);

        if (level) {//If user has level
            level.XP += xpToGive;

            if (level.XP > calculateLevelXP(level.level)) {
                level.XP = 0;
                level.level += 1;

                message.channel.send(`${message.member} you have leveled up to Level ${level.level}!`);
            }

            await level.save().catch((e) => {
                console.log(`Error saving level to DB: ${e}`);
                return;
            });

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000); //60s timeout
        } else { //If user has no level
            const newLevel = new Level({
                userID: message.author.id,
                guildID: message.guild.id,
                XP: xpToGive
            });

            await newLevel.save();
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000); //60s timeout
        }
    } catch (error) {
        console.log(`ERROR giving XP: ${error}`);
    }
};