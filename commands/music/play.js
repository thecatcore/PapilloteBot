const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

function play(connection, linkname) {
    connection.playArbitraryInput(linkname);
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

        if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
            play(connection, linkname)
            return msg.say("Vous écoutez ce lien : " + linkname)
        });
    }
};
