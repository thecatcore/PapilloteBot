const { Command } = require("discord.js-commando");
var uptime = process.uptime()
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
        return msg.say(uptime)
    }
};
