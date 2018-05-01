const firebase = require("firebase");
exports.run = (client, member, [lang]) => {
    const guild = member.guild;
    var database = firebase.database();
    var ref = database.ref(`server/${guild.id}`);
    var langg = {
            lang: lang
    };
    ref.set(langg);
    function gotData(data) {
        console.log("\n");
    }
    function errData(err) {
        console.log("\n");
    }
    
    ref.on("value", gotData, errData);
};