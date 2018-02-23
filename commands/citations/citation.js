const Commando = require("discord.js-commando");
const path = require("path");
const { Command } = require("discord.js-commando");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("citations.json");
const db = low(adapter);
const { RichEmbed } = require("discord.js");



module.exports = class AddCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: "citation",
            group: "group1",
            memberName: "citation",
            description: "",
            examples: [""],
            args: [
                {
                    key: "subcommand",
                    prompt: "add ou tell",
                    type: "string"
                },
                {
                    key: "citation",
                    prompt: "quelle est ta citation ?(cet argument n'est obligatoire que si vous avez mis la sous-commande << tell >>)",
                    type: "string"
                },
                {
                    key: "auteur",
                    prompt: "Qui est a l'origine de la citation ?(cet argument n'est obligatoire que si vous avez mis la sous-commande << tell >>)",
                    type: "string"
                }
            ]
        });    
    }

    async run(msg, { subcommand, citation, auteur }) {
        if (subcommand === "add") {
        msg.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} par ${msg.author} à la base de données.`);
        db.defaults({ citations: [] })
          .write();
        db.get("citations")
          .push({citations: `${citation}`,
            contributeur: `${msg.author}`,
            auteurs: `${auteur}`
          })
          .write();
        } else {
            if (subcommand === "tell") {
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
            } else {
		    msg.send(`La sous-commande ${subcommand} n'existe pas veuillez en donner une valide.`)
        }
    }}}
