const speak = (message) => {
    if (message.content === "salut") {
        message.reply('salut');
    };
    if (message.content === "test") {
        message.reply('Ceci est un test');
    }
}

module.exports = speak;
