const Discord = require('discord.js'); //je récupère les fonctionnalitées de discord en appelant la lib 'discord.js'
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
    };
    if (message.content === "chat") {
        message.reply('https://www.youtube.com/watch?v=UTx_DF2IsFk');
    };
    if (message.content === "chien") {
        message.reply('https://www.youtube.com/watch?v=_Vg9Z0CKPvA');
    };
    if (message.content === "raconte moi une blague papillote") {
        const blagues = require('./blagues.json')
        let blaguenum = Math.floor(Math.random() * 4);
        console.log(blaguenum);
        console.log(blagues);
        if (blaguenum === 0) {
        var blague = blagues.blagues.un;
        } else {
            if (blaguenum === 1) {
                var blague = blagues.blagues.deux;
        } else {
            if (blaguenum === 2) {
                var blague = blagues.blagues.trois;
        } else {
            if (blaguenum === 3) {
                var blague = blagues.blagues.quatre;
        } //else {
            /*if (blaguenum === 4) {
                var blague = blagues.blagues.cinq;
        }*///}
    }}};
        message.reply(blague);
    };
    if(message.content === "bye") {
    message.reply('à plus tard');
    };
    if(message.content === "je dois y aller") {
        message.reply('snif :sob:');
    };
    if(message.content === "bonjour") {
        message.reply('salut :smile:');
    };
    if(message.content === "je lag") {
        var jelag_embed = new Discord.RichEmbed() //je créais une variable dans laquelle je stocke le message encadré
        .addField('ha sa cest un problème :sweat:', 'https://www.youtube.com/watch?v=XE6YaLtctcI');// j'ajoute un espace, le premier text est le titre de cet espace et le deuxième est ça description
        message.reply(jelag_embed);//et là j'envoi mon message encadré sous forme de variable :-)
        //message.reply('');
        //message.reply();
     };

    };
module.exports = speak;
