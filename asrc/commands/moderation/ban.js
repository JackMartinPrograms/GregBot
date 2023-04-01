const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

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
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserID = interaction.options.get('target-user'); //Get the user to ban
        const reason = interaction.options.get('reason')?.value || "No reason provided"; //Get reason for ban if there is one

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserID);

        if (!targetUser) { //Check if user exists
            await interaction.editReply('That user is not in the server!');
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) { //Check if someones trying to ban server owner
            await interaction.editReply('You cannot ban the server owner LMAO');
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; //Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; //Highest role of user running command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; //Highest role of bot

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply('You cannot ban that user since they are a higher role than you!');
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply('I cannot ban that user because they have a higher role than me!');
            return;
        }

        //Ban user
        try {
            await targetUser.ban({reason});
            await interaction.editReply(`User ${targetUser} was banned. Reason: ${reason}`);
            await client.users.send(`${targetUser.id}`, 'You were banned from Zenergy discord for: ' + `${reason}`); //Message them the reason for ban
        } catch (err) {
            console.log(`There was an error banning this user: ${err}`);
        }
    }
};