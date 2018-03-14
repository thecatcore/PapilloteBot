const Commando = require("discord.js-commando");
const path = require("path");
const { Command } = require("discord.js-commando");
const firebase = require("firebase");
// var config = {
//     apiKey: "AIzaSyBS7yIZr45Y1yrWBalCpO3Y2bkS5OYJQQY",
//     authDomain: "papillotebot.firebaseapp.com",
//     databaseURL: "https://papillotebot.firebaseio.com",
//     projectId: "papillotebot",
//     storageBucket: "",
//     messagingSenderId: "68194330678"
//   };
//   firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref("citations");
const { RichEmbed } = require("discord.js");



module.exports = class TellCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: "citation_tell",
            aliases: [ "tellcitation", "citationtell" ],
            group : "citations",
            memberName: "citation tell",
            description: "",
            examples: [""],
        });    
    }

    async run(msg, qgdbhqsf) {
        ref.on('value', gotData, errData);
	    function gotData(data) {
            console.log(data.val());
            var citations = data.val();
            var keys = Object.keys(citations)
            console.log(keys)
            var length = keys.length
            var idd = Math.floor(Math.random() * length);
            var id = idd
            console.log(id);
            var k = keys[id]
            console.log(citations[k]);
            var citiation = citations[k].citation;
            var aut = citations[k].auteur;
            var cont = citations[k].contributeur;
            const embed = new RichEmbed()
	        .setColor("#D9F200")
	        .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
	        .setTitle("Citation :")
	        .setDescription(`${citiation}\nde ${aut}, ajoutée par ${cont} à la base de donnée.`);
            msg.embed(embed);
	    }
	    function errData(err) {
		    console.log("Erreur !");
		    console.log(err);
	    }
    }};
