require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log('GregBot is online lolol');

    client.user.setActivity({
        name: 'Zenergy',
        type: ActivityType.Watching,
    });
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    }

    if (msg.content.includes('skill issue')) {
        msg.reply('LMAO :clown:');
    }
});

client.login(process.env.TOKEN);

