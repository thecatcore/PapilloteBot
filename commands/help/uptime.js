const { Command } = require("discord.js-commando");

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
        var uptime = process.uptime()
        console.log("Uptime Command");
        return msg.say(uptime)
    }
};
