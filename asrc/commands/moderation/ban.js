const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    //deleted: true,
    name: 'ban',
    description: 'Bans a member from the server',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: Object[
        {
            name: 'target-user',
            description: 'The member to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }, 
        {
            name: 'reason',
            description: 'The reason the member was banned',
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply('get banned lol');
    }
};