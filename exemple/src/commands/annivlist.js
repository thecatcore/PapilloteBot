const Discord = require("discord.js");

const annivList = (db, message, randnum) => {
        const anniv = db.getOneAnnivById(randnum);
        console.log(anniv);
        var annivlistEmbed = new Discord.RichEmbed()
          .setColor("#D9F200")
          .setTitle(`${anniv.anniv_annivperso}`)
          .addField("Date :", `${anniv.anniv_date}`)
          .setTimestamp();
          
        message.channel.send(annivlistEmbed);
};

module.exports = annivList;
