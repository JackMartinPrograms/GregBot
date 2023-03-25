const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true); //Get the event folders

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder); //Get all event files   
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop(); //Replace name with actual event name

        eventFiles.sort((a, b) => a > b); //This allows me to make priority commands by using numbers in f names

        client.on(eventName, async (arg) => { //Async because might wanna do stuff w that in future
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg); //Run the function in the file
            }
        });
    }
};