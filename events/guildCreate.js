const firebase = require("firebase");
module.exports = (client, message) => {
    var database = firebase.database();
    var ref = database.ref(`server/${message.guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
    message.channels.get(450692646940180500).send(`J'ai rejoint le serveur ${message.guild.name}, avec l'id ${message.guild.id} !`)
};
