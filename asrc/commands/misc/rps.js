module.exports = {
    name: 'rps',
    description: 'Rock Paper Scissors!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean

    callback: (client, interaction) => {
        function returnRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const number = returnRandomNumber(0, 2);

        if (number === 0) {
            interaction.reply('Rock!');
        } else if (number === 1) {
            interaction.reply('Paper!');
        } else {
            interaction.reply('Scissors!');
        }
    }
};