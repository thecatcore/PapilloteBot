const firebase = require("firebase")
module.exports = (client, member) => {
    var database = firebase.database();
    var ref = database.ref(`server/${member.guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
}
