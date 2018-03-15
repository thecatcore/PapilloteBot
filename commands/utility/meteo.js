const Commando = require("discord.js-commando");
const path = require("path");
const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const weather = require("weather-js");



module.exports = class WeatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            aliases: [ "meteo", "météo" ],
            group : "utile",
            memberName: "weather",
            description: "",
            examples: [""],
            args: [
                {
                    key: "lieu",
                    prompt: "écrit le nom du lieu pour savoir ses prévisions météo :-) !",
                    type: "string"
                },
                {
                    key: "degree",
                    prompt: "C pour Celsius et F pour Farenheit",
                    type: "string"
                }
            ]
        });    
    }

    async run(msg, lieu, degree) {
        weather.fin({search: lieu, degreeType: degree}, function(err, result) {
            if (err) console.log(err)
            msg.say(err)

            var current = result[0].current;
            var location = result[0].location;
            var forecast = result[0].forecast;

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
            msg.embed(currentembed);
            for (i = 0; i < forecast.length; i++) {
                var embed = new RichEmbed()
                    .setTitle(`${forecast[i].day} ${forecast[i].date}`)
                    .setDescription(`**${forecast[i].skytextday}**`)
                    .setAuthor(`Les prévisions pour ${current.observationpoint}`)
                    .setTimestamp()
                    .addField("Température minimum", `${forecast[i].low}${location.degreetype}`)
                    .addField("Température maximum", `${forecast[i].high}${location.degreetype}`)
                    .addField("Précipitation", `${forecast[i].precip}%`);
                msg.embed(embed)
            }
                
            
        });
    }};
