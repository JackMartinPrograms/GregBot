const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    //deleted: true,
    name: 'kick',
    description: 'Kicks a member from the server',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: Object[
        {
            name: 'target-user',
            description: 'The member to kick',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }, 
        {
            name: 'reason',
            description: 'The reason the member was kicked',
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],

    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserID = interaction.options.get('target-user'); //Get the user to kick
        const reason = interaction.options.get('reason')?.value || "No reason provided"; //Get reason for kick if there is one

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserID);

        if (!targetUser) { //Check if user exists
            await interaction.editReply('That user is not in the server!');
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) { //Check if someones trying to kick server owner
            await interaction.editReply('You cannot kick the server owner LMAO');
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; //Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; //Highest role of user running command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; //Highest role of bot

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply('You cannot kick that user since they are a higher role than you!');
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply('I cannot kick that user because they have a higher role than me!');
            return;
        }

        //Kick user
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`User ${targetUser} was kicked. Reason: ${reason}`);
            await client.users.send(`${targetUser.id}`, 'You were kicked from Zenergy discord for: ' + `${reason}`); //Message them the reason for kick
        } catch (err) {
            console.log(`There was an error kicking this user: ${err}`);
        }
    }
};