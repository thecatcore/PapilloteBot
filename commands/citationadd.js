const firebase = require("firebase");
var database = firebase.database();
var ref = database.ref("citations");
exports.run = (client, message, [auteur, ...citation]) => {
  function gotData (data) {

        }
        function errData (err) {
            
        }

        ref.on("value", gotData, errData);
        msg.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} par ${message.author} à la base de données.`);
        var cont = new String(message.author);
        var data = {
            citation: citation,
            auteur: auteur,
            contributeur: cont.toString()
        };
        ref.push(data);
}
