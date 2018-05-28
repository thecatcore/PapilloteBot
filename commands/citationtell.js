const firebase = require("firebase");
var database = firebase.database();
var ref = database.ref("citations");
const { RichEmbed } = require("discord.js");
exports.run = (client, message) => {
  function gotData(data) {
            console.log(data.val());
            var citations = data.val();
            var keys = Object.keys(citations);
            console.log(keys);
            var length = keys.length;
            var idd = Math.floor(Math.random() * length);
            var id = idd;
            console.log(id);
            var k = keys[id];
            console.log(citations[k]);
            var citiation = citations[k].citation;
            var aut = citations[k].auteur;
            var cont = citations[k].contributeur;
            const embed = new RichEmbed()
	        .setColor("#D9F200")
	        .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
	        .setTitle("Citation :")
	        .setDescription(`${citiation}\nde ${aut}, ajoutée par ${cont} à la base de donnée.`);
            message.channel.send(embed);
	    }
	    function errData(err) {
		    console.log("Erreur !");
		    console.log(err);
        }
        
        ref.on("value", gotData, errData);
}
