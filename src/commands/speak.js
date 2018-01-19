const speak = (message) => {
    if (message.content === "salut") {
        message.reply('salut');
    };
    if (message.content === "Salut") {
        message.reply('Salut');
    };
    if (message.content === "test") {
        message.reply('Ceci est un test');
    };
    if (message.content === "comment ça va") {
        message.reply('bah toujours en programmation donc on va dire :smiley: et toi ?');
    };
    if (message.content === "bien") {
        message.reply('super alors !');
    };
    if (message.content === "mal") {
        message.reply('Ah, pourquoi ?');
    };
    if (message.content === "salut sa va ?") {
        message.reply('salut');
        message.reply('bah toujours en programmation donc on va dire :smiley: et toi ?');
    };
    if (message.content === "nyan cat") {
        message.reply('https://www.youtube.com/watch?v=QH2-TGUlwu4');
    };
    if (message.content === "space") {
        message.reply('https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAdmAAAAJDIxOTUzMTY0LTg0NWItNGNkYy04NDE3LTcyZDU1NjFkYmZiZg.jpg');
        message.reply('http://i.neoseeker.com/n/9/spaaace.jpg');
    };

    if (message.content === "a+") {
        message.reply('bye');
    }
module.exports = speak;
