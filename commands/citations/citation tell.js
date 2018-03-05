const Commando = require("discord.js-commando");
const path = require("path");
const { Command } = require("discord.js-commando");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("citations.json");
const db = low(adapter);
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
        var length = db.get("citations")
                       .size()
                       .value();
        console.log(length);
        var id = Math.floor(Math.random() * length);
        console.log(id);
        
        var citiation = db.get(`citations[${id}].citations`)
          .value();
          var cont = db.get(`citations[${id}].contributeur`)
          .value();
          var aut = db.get(`citations[${id}].auteurs`)
          .value();
        const embed = new RichEmbed()
	   .setColor("#D9F200")
	   .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
	   .setTitle("Citation :")
	   .setDescription(`${citiation}\nde ${aut}, ajoutée par ${cont} à la base de donnée.`);
        msg.embed(embed);
    }};
