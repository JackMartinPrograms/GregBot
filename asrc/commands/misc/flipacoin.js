module.exports = {
    name: 'flipacoin',
    description: 'Flip a Coin!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean

    callback: (client, interaction) => {
        function returnRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const number = returnRandomNumber(0, 1);

        if (number === 0) {
            interaction.reply('Heads!');
        } else {
            interaction.reply('Tails!');
        }
    }
};