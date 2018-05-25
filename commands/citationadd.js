const firebase = require("firebase");
var database = firebase.database();
var ref = database.ref("citations");
exports.run = (client, message, [auteur, ...citiation]) => {
  function gotData (data) {

        }
        function errData (err) {
            
        }

        ref.on("value", gotData, errData);
        var citation = "";
        for (a=0;a < citiation.length; a++) {
            citation = citation + " " + citiation[a]
        }
        console.log(citation)
        message.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} par ${message.author} à la base de données.`);
        var cont = new String(message.author);
        var data = {
            citation: citation,
            auteur: auteur,
            contributeur: cont.toString()
        };
        ref.push(data);
}
