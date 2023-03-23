//libs lol
require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({ //bot client instance along w intents for it to use
    intents: [
        IntentsBitField.Flags.Guilds, //Server
        IntentsBitField.Flags.GuildMembers, //Server members
        IntentsBitField.Flags.GuildMessages, //Server messages
        IntentsBitField.Flags.MessageContent, //Server message content 
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

    if (interaction.commandName === 'ping') { // Simple Command
        interaction.reply("Pong!"); //What to do lmao very self explanatory
    }

    if (interaction.commandName === 'add') {// Command with arguments
        const num1 = interaction.options.get('first-number').value; //This has choices instead of UI
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`${num1 + num2}`);
    }
});

client.on('messageCreate', (msg) => { //When a message is sent in chat
    if (msg.author.bot) {
        return;
    }

    function includes(message) {
        if (msg.content.includes(message)) { //I didn't wanna keep writing out if msg.content.includes lmao
            return true;
        }
        return false;
    }

    //Replies to various things users will enter in chat at some point
    if (includes('skill issue')) {
        msg.reply('https://tenor.com/view/skill-issue-gif-19411985');
    }
    
    if (includes('zenergy') && includes('ign')) {
        msg.channel.send(`You can find Zenergys IGN here: <#1088532435169447997>`);
    }
});

client.login(process.env.TOKEN);

