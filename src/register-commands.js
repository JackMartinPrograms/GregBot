//Import lib lol
require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [ //Array of commands (args: command, desc of command)
    {
        name: 'ping',
        description: 'Pong!',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN); //Set version of rest along with bot token

(async () => { //Async function because going to use a weight inside of it
    try {
        console.log('Registering / commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), //Register commands in bot & server
            { body: commands }
        );

        console.log('/ Commands Registered 300+ Score W');
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
})();