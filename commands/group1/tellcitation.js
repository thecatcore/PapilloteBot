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
            name: "tellcitation",
            group: "group1",
            memberName: "tellcitation",
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
	   .setColor(0x954D23)
	   .setTitle("Citation :")
	   .setDescription(`${citiation}\nde ${aut}, ajoutée par ${cont} à la base de donnée.`);
        msg.embed(embed);
    }}