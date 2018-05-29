const firebase = require("firebase");
module.exports = (client, member, message) => {
    var database = firebase.database();
    var ref = database.ref(`server/${member.guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
    message.channel(450692646940180500).send(`J'ai rejoint le serveur ${member.guild.name} !`)
};
