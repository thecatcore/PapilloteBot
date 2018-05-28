const { RichEmbed } = require("discord.js")
const weather = require("weather-js")
exports.run = (client, msg, [degree, ...lieu]) => {
weather.find({search: lieu, degreeType: degree}, function(err, result) {
            if (err) {
                return msg.channel.send(err);
            }
            if (result.length === 0) {
                return msg.channel.reply("Veuillez indiquer une localisation valide !");
            }
            var current = result[0].current;
            var location = result[0].location;
            var forecast = result[0].forecast;
            console.log(current);
            var currentembed = new RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`La météo pour ${current.observationpoint}`)
                .setTitle(`${current.day} ${current.date}`)
                .setTimestamp()
                .setThumbnail(current.imageUrl)
                .addField("Température", `${current.temperature}${location.degreetype}`)
                .addField("Ressenti", `${current.feelslike}${location.degreetype}`)
                .addField("Humiditée", `${current.humidity}%`)
                .addField("Vent", current.winddisplay);
            msg.channel.send(currentembed);
            var i;
            for (i = 2; i < forecast.length; i++) {
                var embed = new RichEmbed()
                    .setTitle(`${forecast[i].day} ${forecast[i].date}`)
                    .setDescription(`**${forecast[i].skytextday}**`)
                    .setAuthor(`Les prévisions pour ${current.observationpoint}`)
                    .setTimestamp()
                    .addField("Température minimum", `${forecast[i].low}${location.degreetype}`)
                    .addField("Température maximum", `${forecast[i].high}${location.degreetype}`)
                    .addField("Précipitation", `${forecast[i].precip}%`);
                msg.channel.send(embed);
            }
                
            
});
}
