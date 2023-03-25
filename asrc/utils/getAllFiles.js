const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = []; //Create array for filenames

    const files = fs.readdirSync(directory, { withFileTypes: true }); //Read files in directory

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly) { //Check if folders only is true
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames; //Return filenames
};