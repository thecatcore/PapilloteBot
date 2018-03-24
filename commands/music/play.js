const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

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
        //if (!msg.member.voiceChannel) {
          //  return msg.say("Tu dois être dans un channel vocal !")
        //};
        //var link = new String(linkname)
        //if (!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
          //  connection.playArbitraryInput(link.toString());
           // return msg.say("Vous écoutez ce lien : " + linkname);
        //});
    }
};
