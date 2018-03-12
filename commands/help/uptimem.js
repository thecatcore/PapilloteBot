const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
var fs = require('fs');

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            aliases: ["time"],
            memberName: "uptime",
            group : "help",
            description: "z",
            examples: ["z"]
        });    
    }

    run(msg) {
        console.log("Uptime Command");
        var secondess = fs.readFileSync('commands/help/seconde.json');
        var secondes = JSON.parse(secondess);
        var minutess = fs.readFileSync('commands/help/minute.json');
        var minutes = JSON.parse(minutess);
        var heuress = fs.readFileSync('commands/help/heure.json');
        var heures = JSON.parse(heuress);
        var uptime = new RichEmbed()
            .setTitle("Uptime")
            .addField("Secondes", secondes)
            .addField("Minutes", minutes)
            .addField("Heures", heures);
        return msg.embed(uptime);
    }
};
