const firebase = require("firebase")
module.exports = (client, member, [lang]) => {
    const guild = member.guild;
    var database = firebase.database();
    var ref = database.ref(`server/${guild.id}`);
    var lang = {
            lang: lang
    };
    ref.set(lang);
}
