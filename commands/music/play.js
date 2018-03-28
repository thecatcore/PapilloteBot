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
        var queue = []
        var queueNames = []
        var isPlaying = false
        var dispatcher = "space"
        var voiceChannel = 111
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
        ref.once("value", function (snap) {
        if (snap.val().isPlaying) {
            getID(linkname, function (id) {
                add_to_queue(ref, id, msg, ref);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.say(" Ajoutée à la queue : " + videoInfo.title);
                    var videoname = videoInfo.title
                    queueNames.push(videoname)
                    ref.update({
                        queueNames: queueNames
                    })
                    })
            });
        } else {
            isPlaying = true
            getID(linkname, function(id) {
                playMusic(id, msg, ref);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.say(" Joue maintenant : " + videoInfo.title);
                    var videoname = videoInfo.title
                    queueNames.push(videoname)
                    ref.update({
                        queueNames: queueNames,
                        isPlaying: isPlaying
                    })
                    })
                })
            }
        })
        }
    };

function playMusic(id, msg) {
    var ref = database.ref(`music/${msg.guild.id}`)
    voiceChannel = msg.member.voiceChannel;
    ref.update({
        voiceChannel: voiceChannel,
    })
    ref.once("value", function (snap) {
    snap.val().voiceChannel.join().then(function (connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: "audioonly"
        });
        skipReq = 0;
        skippers = [];
        ref.update({
            skipReq: skipReq,
            skippers: skippers
        })
        dispatcher = connection.playStream(stream);
        ref.update({
            dispatcher: dispatcher,
        })
        snap.val().dispatcher.on("end", function () {
            skipReq = 0;
            skippers = [];
            queue.shift();
            queueNames.shift()
            ref.update({
                queue: queue,
                queueNames: queueNames,
                skipReq: skipReq,
                skippers: skippers
            })
            if (snap.val().queue.length === 0) {
                queue = [];
                queueNames = [];
                isPlaying = false;
                ref.update({
                    queue: queue,
                    queueNames: queueNames,
                    isPlaying: isPlaying
                })
            } else {
                setTimeout(function () {
                    playMusic(snap.val().queue[0], msg)
                }, 500)
            }
        })
    }).catch(console.error);
})
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
    var ref = database.ref(`music/${msg.guild.id}`)
    if (isYoutube(strID)) {
        queue.push(getYouTubeID(strID));
        ref.update({
            queue: queue
        })
    } else {
        queue.push(strID);
        ref.update({
            queue: queue
        })
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