const { Command } = require("discord.js-commando");
var uptime = require("./uptime.json")
const { RichEmbed } = require("discord.js");

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
        var uptime = new RichEmbed()
            .setTitle("Uptime")
            .addField("Secondes", uptime.uptime.seconde)
            .addField("Minutes", uptime.uptime.minute)
            .addField("Heures", uptime.uptime.heure);
        return msg.embed(uptime);
    }
};
