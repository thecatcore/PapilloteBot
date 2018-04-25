const firebase = require("firebase")
exports.run = (client, member, [lang]) => {
    const guild = member.guild;
    var database = firebase.database();
    var ref = database.ref(`server/${guild.id}`);
    var lang = {
            lang: lang
    };
    ref.set(lang);
}
