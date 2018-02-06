const osuInfo = (message) => {
    const OsuAPI = require("osuapi-js");
    const api = new OsuAPI("9b54c70425b4b05767544c845260efe216dd84eb", { beatmaps: { fetchCreatorInfo: false } });
    const Discord = require("discord.js");
    const value = message.content.substr(10);   
    console.log(value); 
    api.getUser(value)
        .then((user) => {
            console.log(user);
            var osuInfoEmbed = new Discord.RichEmbed()
                .setTitle(user.username)
                .addField("ID", user.ID)
                .addField("Nombre de :", `parties jouées : ${user.count.play}\nSS : ${user.count.SS}\nS : ${user.count.S}\nA : ${user.count.A}\n300 : ${user.count[300]}\n100 : ${user.count[100]}\n50 : ${user.count[50]}`)
                .addField("Score", `ranked : ${user.score.ranked}\ntotal : ${user.score.total}`)
                .addField("Rank", `Par pays : ${user.pp.countryRank}\nMondialement : ${user.pp.rank}`)
                .addField("Niveau", user.level)
                .addField("Précision", user.accuracy)
                .addField("Pays", user.country);
            
                message.channel.send(osuInfoEmbed);
        })
        .catch((error) => {
            console.error(error);
          });
};

module.exports = osuInfo;