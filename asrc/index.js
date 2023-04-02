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
        IntentsBitField.Flags.GuildPresences, //Guild Presences
        IntentsBitField.Flags.MessageContent, //Server message content 
    ],
});

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`There was an error while connecting to MongoDB: ${error}`);
    }
})();

eventHandler(client); //Register event handler
client.login(process.env.TOKEN); //Login

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

