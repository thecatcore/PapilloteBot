const Discord = require('discord.js');

const anniv_list = (db, message, randnum) => {
        const anniv = db.getOneAnnivById(randnum);
        console.log(anniv);
        var annivlist_embed = new Discord.RichEmbed()
          .setColor('#D9F200')
          .setTitle(`${anniv.anniv_annivperso}`)
          .addField("Date :", `${anniv.anniv_date}`)
          .setTimestamp();
          
        message.channel.send(annivlist_embed)

        console.log(annivlist_embed)
}

module.exports = anniv_list;