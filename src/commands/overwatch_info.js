const info_player = (message) => {
    var owjs = require('overwatch-js');
    var Discord = require('discord.js');

//// Search for a player ( you must have the exact username, if not Blizzard api will return a not found status)
owjs
    .getAll('pc', 'eu', 'Zeya-2303')
    .then((data) => {console.dir(data, {depth : 2, colors : true})
        var ov_info_embed = new Discord.RichEmbed()
        .setTitle(data.profile.nick)
        .addField('Niveau', data.profile.level)
        .setThumbnail(data.profile.avatar)
        .addField('Tier', data.profile.ranking)
        .addField('Rank', data.profile.rank);
        message.channel.send(ov_info_embed); 
    });
    owjs
    .getAll('pc', 'eu', 'Zeya-2303')
    .then((data) => console.dir(data, {depth : 2, colors : true}) );
}

module.exports = info_player;