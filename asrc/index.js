//libs lol
require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({ //bot client instance along w intents for it to use
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => { //runs when bot starts
    console.log('GregBot is online lolol');

    client.user.setActivity({
        name: 'Zenergy',
        type: ActivityType.Watching, //Set activity status of bot
    });
});

client.on('interactionCreate', (interaction) => { //When command is run
    if (!interaction.isChatInputCommand()) return; //Check if actually command lmao

    if (interaction.commandName === 'ping') { //Command
        interaction.reply("Pong!"); //What to do lmao very self explanatory
    }
});

client.on('messageCreate', (msg) => { //When a message is sent in chat
    if (msg.author.bot) {
        return;
    }

    function includes(message) {
        if (msg.content.includes(message)) { //I didn't wanna keep writing out if msg.content.includes
            return true;
        }
        return false;
    }

    if (includes('skill issue')) {
        msg.reply('https://tenor.com/view/skill-issue-gif-19411985');
    }
    
    if (includes('zenergy') && includes('ign')) {
        msg.reply('You can find Zenergys IGN here: #📌roles');
    }
});

client.login(process.env.TOKEN);

