//libs lol
require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [ //Array of commands
    {
        name: 'ping',
        description: 'Pong!', //Simple command
    },
    {
        name: 'add',
        description: 'adding command lol', //Command with arguments
        options: [
            {
                name: 'first-number',
                description: 'The First Number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two', //Give choices to be entered into the command
                        value: 2,    //as well as user inputted ones
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],
                required: true
            },
            {
                name: 'second-number',
                description: 'The Second Number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
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