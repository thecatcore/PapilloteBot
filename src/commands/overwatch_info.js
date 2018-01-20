const info_player = (message) => {
    var owjs = require('overwatch-js');
    var Discord = require('discord.js');
    const value = message.content.substr(9);
    console.log(value);
    owjs.getAll('pc', 'eu', `${value}`)
    .then((data) => {
        //console.dir(data, {depth : 2, colors : true})
        var ov_info_embed = new Discord.RichEmbed()
        .setTitle(data.profile.nick)
        .addField('Niveau', data.profile.level)
        .setThumbnail(data.profile.avatar)
        .addField('Tier', data.profile.ranking)
        .addField('Rank', data.profile.rank);
        message.channel.send(ov_info_embed); 
    })
    .catch((error) => {
        console.error(error);
        message.channel.send('Profile non trouvé');
      });
      
};

module.exports = info_player;