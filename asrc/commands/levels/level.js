const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require('discord.js');
const canvacord = require('canvacord');
const Level = require('../../models/level');
const calculateLevelXP = require('../../utils/calculateLevelXP');

module.exports = {
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild) {
            interaction.reply('You can only run this command inside a server!');
            return;
        }

        await interaction.deferReply();

        const mentionedUserID = interaction.options.get('target-user')?.value;
        const targetUserID = mentionedUserID || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserID);

        const fetchedLevel = await Level.findOne({
            userID: targetUserID,
            guildID: interaction.guild.id
        });

        if (!fetchedLevel) {
            interaction.editReply(
                mentionedUserID ? `${targetUserObj.user.tag} doesn't have any levels yet!` : "You don't have any levels yet!"
            );
            return;
        }

        let allLevels = await Level.find({guildID: interaction.guild.id}).select('-_id userID level XP');

        allLevels.sort((a, b) => {
            if (a.level === b.level) { //If levels are the same
                return b.XP - a.XP; //Compare based on xp
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userID === targetUserID) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.XP)
            .setRequiredXP(calculateLevelXP(fetchedLevel.level))
            .setStatus(targetUserObj.presence.status)
            .setProgressBar('#00d9ff', 'COLOR')
            .setUsername(targetUserObj.user.username)
            .setDiscriminator(targetUserObj.user.discriminator)
            .setBackground('IMAGE', 'https://imgur.com/qIa5kjC.jpg'); //Can be image/colour

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        
        interaction.editReply({ files: [attachment] });
    },

    name: 'rank',
    description: 'Shows a users level',
    options: [
        {
            name: 'target-user',
            description: 'The users level you want to see',
            type: ApplicationCommandOptionType.Mentionable
        }
    ],
}