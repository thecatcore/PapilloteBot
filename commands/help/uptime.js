const { Command } = require("discord.js-commando");
const uptime = require("uptime.json");
const { RichEmbed } = require("discord.js");

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            aliases: ["time"],
            memberName: "uptime",
            group : "uptime",
            description: "",
            examples: [""]
        });    
    }

    run(msg) {
        var embed = new RichEmbed()
            .setTitle("Uptime")
            .addField("Secondes", uptime.secondes)
            .addField("Minutes", uptime.minutes)
            .addField("Heures", uptime.heures);
        msg.embed(embed);
    }
};
