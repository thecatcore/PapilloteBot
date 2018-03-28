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
        var queue = {
            length: 0,
            song : []
        }
        var queueNames = []
        var isPlaying = false
        var dispatcher = null
        var voiceChannel = null
        var skipReq = 0
        var skippers = []
        ref.set({
            queue: queue,
            queueNames: queueNames,
            isPlaying: isPlaying,
            dispatcher: dispatcher,
            voiceChannel: voiceChannel,
            skipReq: skipReq,
            skippers: skippers
        })
        //console.log("length" + ref.queue.length)
        console.log(firebase.auth())
        if (ref.isPlaying) {
            getID(linkname, function (id) {
                add_to_queue(id, msg, ref);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.say(" Ajoutée à la queue : " + videoInfo.title);
                    var videoname = videoInfo.title
                    queueNames.push(videoname)
                    ref.set({
                        queue: queue,
                        queueNames: queueNames,
                        isPlaying: isPlaying,
                        dispatcher: dispatcher,
                        voiceChannel: voiceChannel,
                        skipReq: skipReq,
                        skippers: skippers
                    })
                    })
            });
        } else {
            isPlaying = true
            ref.set({
                queue: queue,
                queueNames: queueNames,
                isPlaying: isPlaying,
                dispatcher: dispatcher,
                voiceChannel: voiceChannel,
                skipReq: skipReq,
                skippers: skippers
            })
            getID(linkname, function(id) {
                playMusic(id, msg, ref);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.say(" Joue maintenant : " + videoInfo.title);
                    var videoname = videoInfo.title
                    queueNames.push(videoname)
                    ref.set({
                        queue: queue,
                        queueNames: queueNames,
                        isPlaying: isPlaying,
                        dispatcher: dispatcher,
                        voiceChannel: voiceChannel,
                        skipReq: skipReq,
                        skippers: skippers
                    })
                    })
                })
            }
        }
    };

function playMusic(id, msg, ref) {
    ref.voiceChannel = msg.member.voiceChannel;
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
       if (!json.items[0]) callback("3_-a9nVZYjk");
       else {
        callback(json.items[0].id.videoId)
       }
    })
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}