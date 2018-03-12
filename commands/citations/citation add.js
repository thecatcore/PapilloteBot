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
            name: "citation_add",
            group : "citations",
            memberName: "citation_add",
            description: "",
            examples: [""],
            args: [
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

    async run(msg, { citation, auteur }) {
        
        msg.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} par ${msg.author} à la base de données.`);
        db.defaults({ citations: [] })
          .write();
        db.get("citations")
          .push({citations: `${citation}`,
            contributeur: `${msg.author}`,
            auteurs: `${auteur}`
          })
          .write();
    }};
