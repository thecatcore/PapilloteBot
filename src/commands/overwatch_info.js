const info_player = (message) => {
    var owjs = require('overwatch-js');

//// Search for a player ( you must have the exact username, if not Blizzard api will return a not found status)
owjs
    .search('Zeya#2303')
    .then((data) => {
        console.dir(data, {depth : 2, colors : true});
        message.channel.send(data); 
    });
}

module.exports = info_player;