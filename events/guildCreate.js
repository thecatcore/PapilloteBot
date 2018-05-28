const firebase = require("firebase")
modules.export = (client, member) {
    var database = firebase.database();
    var ref = database.ref(`server/${member.guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
}
