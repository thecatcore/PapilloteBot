const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const YTDL = require("ytdl-core");

var servers = {}

function play(connection, message) {
    var server = servers[msg.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    })
}

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p"],
            memberName: "play",
            group : "music",
            description: "",
            examples: [""],
            args: [
                {
                   key: "linkname",
                   prompt: "lien/nom de la music/playlist",
                   type: "string"
                }
            ]
        });    
    }

    run(msg, { linkname }) {
        if (!msg.member.voiceChannel) {
            return msg.say("Tu dois être dans un channel vocal !")
        };
        if (!servers[msg.guild.id]) servers[msg.guild.id] = {
            queue: []
        };
        var server = servers[msg.guild.id]

        if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
            play(connection, message)
        });
    }
};
