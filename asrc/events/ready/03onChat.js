const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    client.on('messageCreate', (message) => { //When message is sent in chat
        if (message.author.bot) {
            return;
        }

        function includes(msg) { //Didn't wanna keep writing out lol
            if (message.content.includes(msg)) {
                return true;
            }
            return false;
        }

        //VOTING CHANNEL REACTIONS
        if (message.channel.id === process.env.VOTINGCHANNELID) {
            message.react('👍');
            message.react('👎');
            return;
        }

        //MODERATION
        //add bad word filter
        
        if (message.mentions.members.first() === message.guild.members.cache.get('922467547935289344')) { //Nobody can mention me
            //if they don't have staff or creator role (to add)
            message.delete();
            return;
        }

        //GENERAL STUFF
        if (includes('zenergy') || includes('zenergys') || includes('zenergy\'s') && includes('ign')) {
            message.reply(`You can find Zenergys IGN here: <#1088532435169447997>`);
            return;
        }

        //FUN STUFF

        if (includes('skill issue')) {
            message.reply('https://tenor.com/view/nerd-nerdy-nerds-nerd-emoji-gif-25380417');
            return;
        }

        if (includes('ez')) { //Funny hypixel chat system (not possible to edit users chat so this will have to do)
            const replies = ["Anyone else really like Rick Astley?",
                             "Sometimes they sing soppy, love songs in the car.",
                             "They like long walks on the beach and watching Zenergy",
                             "You're a great person!",
                             "In their free time they like to watch cat videos on YouTube",
                             "When they saw the witch with the potion, they knew there was trouble brewing.",
                             "If the Minecraft world is infinite, how is the sun spinning around it?",
                             "Hello everyone! I am an innocent person who loves everything Zenergy.",
                             "Plz give me doggo memes!",
                             "I heard you like Minecraft, so I built a computer in Minecraft in your Minecraft so you can Minecraft while you Minecraft",
                             "Why can't the Ender Dragon read a book? Because she always starts at the End.",
                             "They sometimes try to say bad things then this happens",
                             "What happens if I add chocolate milk to macaroni and cheese?",
                             "Can you paint with all the colors of the wind?",
                             "Blue is greener than purple for sure",
                             "When nothing is right, go left.",
                             "Your personality shines brighter than the sun.",
                             "You are very good at the game friend.",
                             "They like pineapple on their pizza",
                             "I like pasta, do you prefer nachos?",
                            ];
            
            var randomNumber = Math.floor(Math.random() * replies.length);

            message.reply(replies[randomNumber]);
            return;
        }
    });
};