const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const guilds = require("./song.json")
module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            aliases: ["sk"],
            memberName: "skip",
            group : "music",
            description: "",
            examples: [""]
        });    
    }

    run(msg) {
        console.log(guilds)
        msg.say(guilds)
        if (guilds[msg.guild.id].skippers.indexOf(msg.author.id) === -1) {
            guilds[msg.guild.id].skippers.push(msg.author.id);
            guilds[msg.guild.id].skipReq++;
            skip_song(msg);
            msg.reply("Skip en cours !")
        }
    }
};

function skip_song(msg) {
    guilds[msg.guild.id].dispatcher.end();
    if (guilds[msg.guild.id].queue.length > 1) {
        playMusic(guilds[msg.guild.id].queue[0].msg);
    } else {
        guilds[msg.guild.id].skipReq = 0;
        guilds[msg.guild.id].skippers = [];
    }
}