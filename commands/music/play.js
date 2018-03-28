const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
var fs = require("fs");
var firebase = require("firebase");
var database = firebase.database()

var guilds = {};



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
        var ref = database.ref(`music/${msg.guild.id}`)
        ref.set({
            queue: [],
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            skipReq: 0,
            skippers: []
        })

        // if (guilds[msg.guild.id].queue.length > 0 || guilds[msg.guild.id].isPlaying) {
        //     getID(linkname, function (id) {
        //         add_to_queue(id, msg);
        //         fetchVideoInfo(id, function(err, videoInfo) {
        //             if (err) throw new Error(err);
        //             msg.say(" Ajoutée à la queue : " + videoInfo.title);
        //             guilds[msg.guild.id].queueNames.push(videoInfo.title)
        //             fs.writeFileSync("./song.json", guilds);
        //         })
        //     });
        // } else {
        //     guilds[msg.guild.id].isPlaying = true;
        //     getID(linkname, function(id) {
        //         guilds[msg.guild.id].queue.push("placeholder");
        //         playMusic(id, msg);
        //         fetchVideoInfo(id, function(err, videoInfo) {
        //             if (err) throw new Error(err);
        //             console.log(videoInfo)
        //             msg.say(" Joue maintenant : " + videoInfo.title);
        //             guilds[msg.guild.id].queueNames.push(videoInfo.title)
        //             fs.writeFileSync("./song.json", guilds);
        //         })
        //     })
        // }
    }
};

function playMusic(id, msg) {
    guilds[msg.guild.id].voiceChannel = msg.member.voiceChannel;
    console.log(msg.member)
    console.log(msg.member.GuildMember)
    console.log(guilds[msg.guild.id].voiceChannel)
    guilds[msg.guild.id].voiceChannel.join().then(function (connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: "audioonly"
        });
        guilds[msg.guild.id].skipReq = 0;
        guilds[msg.guild.id].skippers = [];

        guilds[msg.guild.id].dispatcher = connection.playStream(stream);
        guilds[msg.guild.id].dispatcher.on("end", function () {
            guilds[msg.guild.id].skipReq = 0;
            guilds[msg.guild.id].skippers = [];
            guilds[msg.guild.id].queue.shift();
            guilds[msg.guild.id].queueNames.shift()
            if (guilds[msg.guild.id].queue.length === 0) {
                guilds[msg.guild.id].queue = [];
                guilds[msg.guild.id].queueNames = [];
                guilds[msg.guild.id].isPlaying = false;
            } else {
                setTimeout(function () {
                    playMusic(guilds[msg.guild.id].queue[0], msg)
                }, 500)
            }
        })
    }).catch(console.error);
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYouTubeID(str));
    } else {
        search_video(str, function (id) {
            cb(id);
        })
    }
}

function add_to_queue(strID, msg) {
    if (isYoutube(strID)) {
        guilds[msg.guild.id].queue.push(getYouTubeID(strID));
    } else {
        guilds[msg.guild.id].queue.push(strID);
    }
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + process.env.YT_KEY, function(error, response, body) {
       var json = JSON.parse(body);
       console.log(json);
       if (!json.items[0]) callback("3_-a9nVZYjk");
       else {
        callback(json.items[0].id.videoId)
       }
    })
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}