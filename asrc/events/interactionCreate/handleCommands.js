const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => { //Handle command logic 
    if (!interaction.isChatInputCommand) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name == interaction.commandName);

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply(
                    {
                        content: 'Only developers are able to run this command!',
                        ephemeral: true //Make it so only the user who ran the command can see this
                    }
                );
                
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply(
                    {
                        content: 'This command cannot be ran here!',
                        ephemeral: true
                    }
                );
                
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply(
                        {
                            content: 'You do not have the permissions required to run this command!',
                            ephemeral: true
                        }
                    );

                    return;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply(
                        {
                            content: 'I do not have enough permissions:(',
                            ephemeral: true
                        }
                    );

                    return;
                }
            }
        }
        
        await commandObject.callback(client, interaction);
    } catch (err) {
        console.log(`There was an error running this command: ${error}`);
    }
};