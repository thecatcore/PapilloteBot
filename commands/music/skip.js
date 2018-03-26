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
        msg.say(guilds)
        if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
            guilds[message.guild.id].skippers.push(message.author.id);
            guilds[message.guild.id].skipReq++;
            skip_song(message);
            message.reply("Skip en cours !")
        }
    }
};

function skip_song(message) {
    guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].queue.length > 1) {
        playMusic(guilds[message.guild.id].queue[0].message);
    } else {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
    }
}