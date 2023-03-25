const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    client.user.setActivity({
        name: 'Zenergy',
        type: ActivityType.Watching, //Set activity status of bot
    });
};