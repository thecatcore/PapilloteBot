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
            .addField("Secondes", uptime.seconde)
            .addField("Minutes", uptime.minute)
            .addField("Heures", uptime.heure);
        return msg.embed(uptime);
    }
};
