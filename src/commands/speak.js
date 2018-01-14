const speak = (message) => {
    if (message.content === "salut") {
        message.reply('salut');
    }
}

module.exports = speak;