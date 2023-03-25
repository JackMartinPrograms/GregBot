const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localCommands = []; //Create array for local commands

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'), true //Get all command category folders
    );

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory); //Get all command files
        
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            if (exceptions.includes(commandObject.name)){
                continue;
            } 
            localCommands.push(commandObject); //Push commands to array
        }
    }

    return localCommands; //return it lolol
};