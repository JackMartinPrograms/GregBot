//libs lol
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');

const client = new Client({ //bot client instance along w intents for it to use
    intents: [
        IntentsBitField.Flags.Guilds, //Server
        IntentsBitField.Flags.GuildMembers, //Server members
        IntentsBitField.Flags.GuildMessages, //Server messages
        IntentsBitField.Flags.MessageContent, //Server message content 
    ],
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`There was an error while connecting to MongoDB: ${error}`);
    }
})();

eventHandler(client); //Register event handler

client.login(process.env.TOKEN);





























































// client.on('ready', (c) => { //runs when bot starts
//     console.log('GregBot is online lolol');

//     client.user.setActivity({
//         name: 'Zenergy',
//         type: ActivityType.Watching, //Set activity status of bot
//     });
// });

// client.on('interactionCreate', (interaction) => { //When command is run
//     if (!interaction.isChatInputCommand()) return; //Check if actually command lmao

//     if (interaction.commandName === 'ping') { // Simple Command
//         interaction.reply("Pong!"); //What to do lmao very self explanatory
//     }

//     if (interaction.commandName === 'add') {// Command with arguments
//         const num1 = interaction.options.get('first-number').value; //This has choices instead of UI
//         const num2 = interaction.options.get('second-number').value;

//         interaction.reply(`${num1 + num2}`);
//     }

//     if (interaction.commandName === 'embed') {
//         const pfp = new AttachmentBuilder('D:/Career/Discord/GregBot/asrc/img/greg.png');
//         const embed = new EmbedBuilder()
//         .setTitle('Embed Title')
//         .setThumbnail('attachment://greg.png')
//         .setDescription('This is an embed description')
//         .setColor(0x00F0FF) //You can use 0xcolourcode (00F0FF) or 'Colour', 'Random'
//         .addFields(
//             {
//                 name: 'Field Title', value: 'Field Value' //If want to be inline, use inline: true
//             }
//         )
//         .setTimestamp(Date.now())
//         .setFooter({text: 'This is a footer lol'}) //iconURL: 'url'

//         interaction.channel.send({embeds: [embed], files: [pfp]});
//     }
// });

// client.on('messageCreate', (msg) => { //When a message is sent in chat
//     if (msg.author.bot) {
//         return;
//     }

//     function includes(message) {
//         if (msg.content.includes(message)) { //I didn't wanna keep writing out if msg.content.includes lmao
//             return true;
//         }
//         return false;
//     }

//     //Replies to various things users will enter in chat at some point
//     if (includes('skill issue')) {
//         msg.reply('https://tenor.com/view/skill-issue-gif-19411985');
//     }
    
//     if (includes('zenergy') && includes('ign')) {
//         msg.channel.send(`You can find Zenergys IGN here: <#1088532435169447997>`);
//     }
// });

