const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
import guilds from "./play"

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["q"],
            memberName: "queue",
            group : "music",
            description: "",
            examples: [""]
        });    
    }

    run(msg) {
        var message2 = "```";
        for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
            var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "**(Musique actuelle)**" : "") + "\n";
            if ((message2 + temp).length <= 2000 - 3) {
                message2 += temp;
            } else {
                message2 += "```";
                msg.say(message2)
                message2 = "```";
            }
        }
        message2 += "```";
        msg.say(message2)
    }
};

