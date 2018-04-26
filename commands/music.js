const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
exports.run = (client, message, [subcommand, args]) => {
var guilds = {};

if (!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
        queue: [],
        queueNames: [],
        isPlaying: false,
        dispatcher: null,
        voiceChannel: null,
        skipReq: 0,
        skippers: []
    }
}

if (subcommand === "play") {
if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
    getID(args, function (id) {
        add_to_queue(id, message);
        fetchVideoInfo(id, function(err, videoInfo) {
            if (err) throw new Error(err);
            message.reply(" Ajoutée à la queue : " + videoInfo.title);
            guilds[message.guild.id].queueNames.push(videoInfo.title)
        })
    });
} else {
    guilds[message.guild.id].isPlaying = true;
    getID(args, function(id) {
        guilds[message.guild.id].queue.push("placeholder");
        playMusic(id, message);
        fetchVideoInfo(id, function(err, videoInfo) {
            if (err) throw new Error(err);
            console.log(videoInfo)
            message.reply(" Joue maintenant : " + videoInfo.title);
            guilds[message.guild.id].queueNames.push(videoInfo.title)
        })
    })
}
} else if (subcommand === "skip") {
    if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
        guilds[message.guild.id].skippers.push(message.author.id);
        guilds[message.guild.id].skipReq++;
        skip_song(message);
        message.reply("Skip en cours !")
    }
} else if (subcommand === "queue") {
    var message2 = "```";
    for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
        var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "**(Musique actuelle)**" : "") + "\n";
        if ((message2 + temp).length <= 2000 - 3) {
            message2 += temp;
        } else {
            message2 += "```";
            message.channel.send(message2)
            message2 = "```";
        }
    }
    message2 += "```";
    message.channel.send(message2)
}

client.on("ready", function () {
    console.log("Je suis prêt !")
})

function skip_song(message) {
    guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].queue.length > 1) {
        playMusic(guilds[message.guild.id].queue[0].message);
    } else {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
    }
}

function playMusic(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
    console.log(message.member)
    console.log(message.member.GuildMember)
    console.log(guilds[message.guild.id].voiceChannel)
    guilds[message.guild.id].voiceChannel.join().then(function (connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: "audioonly"
        });
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];

        guilds[message.guild.id].dispatcher = connection.playStream(stream);
        guilds[message.guild.id].dispatcher.on("end", function () {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
            guilds[message.guild.id].queue.shift();
            guilds[message.guild.id].queueNames.shift()
            if (guilds[message.guild.id].queue.length === 0) {
                guilds[message.guild.id].queue = [];
                guilds[message.guild.id].queueNames = [];
                guilds[message.guild.id].isPlaying = false;
            } else {
                setTimeout(function () {
                    playMusic(guilds[message.guild.id].queue[0], message)
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

function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
        guilds[message.guild.id].queue.push(getYouTubeID(strID));
    } else {
        guilds[message.guild.id].queue.push(strID);
    }
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + client.config.ytkey, function(error, response, body) {
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
}