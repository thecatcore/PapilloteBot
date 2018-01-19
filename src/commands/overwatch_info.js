const info_player = (message) => {
    var owjs = require('overwatch-js');
    var Discord = require('discord.js');

//// Search for a player ( you must have the exact username, if not Blizzard api will return a not found status)
owjs
    .search('Zeya#2303')
    .then((data) => {
        console.log(data);
        var ov_info_embed = new Discord.RichEmbed()
        .setTitle(data.platformDisplayName)
        .addField('Niveau', data.level)
        .setImage(data.portrait)
        .addField('Tier', data.tier)
        .addField('Platforme', data.region);
        message.channel.send(ov_info_embed); 
    });
}

module.exports = info_player;