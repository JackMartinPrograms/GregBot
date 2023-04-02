const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Purge messages',
    options: Object[
        {
            name: 'amount',
            description: 'The member to kick',
            required: true,
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
    
    callback: async (client, interaction) => {
        console.log(options);
    }
};