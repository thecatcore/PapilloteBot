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

        if (ref.queue.length > 0 || ref.isPlaying) {
            getID(linkname, function (id) {
                add_to_queue(id, msg);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.say(" Ajoutée à la queue : " + videoInfo.title);
                    ref.queueNames.push(videoInfo.title)
                })
            });
        } else {
            ref.isPlaying = true;
            getID(linkname, function(id) {
                ref.queue.push("placeholder");
                playMusic(id, msg);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    console.log(videoInfo)
                    msg.say(" Joue maintenant : " + videoInfo.title);
                    ref.queueNames.push(videoInfo.title)
                })
            })
        }
    }
};

function playMusic(id, msg) {
    ref.voiceChannel = msg.member.voiceChannel;
    console.log(msg.member)
    console.log(msg.member.GuildMember)
    console.log(ref.voiceChannel)
    ref.voiceChannel.join().then(function (connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: "audioonly"
        });
        ref.skipReq = 0;
        ref.skippers = [];

        ref.dispatcher = connection.playStream(stream);
        ref.dispatcher.on("end", function () {
            ref.skipReq = 0;
            ref.skippers = [];
            ref.queue.shift();
            ref.queueNames.shift()
            if (ref.queue.length === 0) {
                ref.queue = [];
                ref.queueNames = [];
                ref.isPlaying = false;
            } else {
                setTimeout(function () {
                    playMusic(ref.queue[0], msg)
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
        ref.queue.push(getYouTubeID(strID));
    } else {
        ref.queue.push(strID);
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