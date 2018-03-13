const Commando = require("discord.js-commando");
const path = require("path");
const { Command } = require("discord.js-commando");
const firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBS7yIZr45Y1yrWBalCpO3Y2bkS5OYJQQY",
    authDomain: "papillotebot.firebaseapp.com",
    databaseURL: "https://papillotebot.firebaseio.com",
    projectId: "papillotebot",
    storageBucket: "",
    messagingSenderId: "68194330678"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref("citations");
const { RichEmbed } = require("discord.js");



module.exports = class TellCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: "citation_tell",
            group : "citations",
            memberName: "citation tell",
            description: "",
            examples: [""],
        });    
    }

    async run(msg) {
        ref.on('value', gotData, errData);
	function gotData(data) {
		msg.channel.send(data.val());
	}
	function errData(err) {
		console.log("Erreur !");
		console.log(err);
	}
        
        //const embed = new RichEmbed()
	   //.setColor("#D9F200")
	   //.setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
	   //.setTitle("Citation :")
	  // .setDescription(`${citiation}\nde ${aut}, ajoutée par WIP à la base de donnée.`);
        //msg.embed(embed);
    }};
