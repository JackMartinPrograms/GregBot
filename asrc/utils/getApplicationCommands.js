module.exports = async (client, guildID) => {
    let applicationCommands;

    if (guildID) {
        const guild = await client.guilds.fetch(guildID); //Get the guild id
        applicationCommands = guild.commands; //Get Local commands
    } else {
        applicationCommands = await client.application.commands; //Get global commands
    }

    await applicationCommands.fetch();
    return applicationCommands;
};