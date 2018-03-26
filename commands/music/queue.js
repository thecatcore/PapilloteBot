const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const guilds = require("./song.json")

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
        console.log(guilds)
        msg.say(guilds)
        var msg2 = "```";
        for (var i = 0; i < guilds[msg.guild.id].queueNames.length; i++) {
            var temp = (i + 1) + ": " + guilds[msg.guild.id].queueNames[i] + (i === 0 ? "**(Musique actuelle)**" : "") + "\n";
            if ((msg2 + temp).length <= 2000 - 3) {
                msg2 += temp;
            } else {
                msg2 += "```";
                msg.say(msg2)
                msg2 = "```";
            }
        }
        msg2 += "```";
        msg.say(msg2)
    }
};

