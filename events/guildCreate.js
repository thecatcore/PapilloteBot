const firebase = require("firebase");
module.exports = (client, guild) => {
    var database = firebase.database();
    var ref = database.ref(`server/${guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
    var chan = client.channels.get("450692646940180500")
    chan.send(`J'ai rejoint le serveur ${guild.name}, avec l'id ${guild.id} !`)
};
