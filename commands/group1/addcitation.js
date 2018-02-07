const Commando = require('discord.js-commando');
const path = require('path');
const { Command } = require('discord.js-commando');
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('citations.json')
const db = low(adapter)



module.exports = class AddCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addcitation',
            group: 'group1',
            memberName: 'addcitation',
            description: 'Le bot ajoute votre citation à la base de donnée',
            examples: ['addcitation'],
            args: [
                {
                    key: 'citation',
                    prompt: 'quelle est ta citation',
                    type: 'string'
                },
                {
                    key: "auteur",
                    prompt: "Qui est a l'origine de la citation ?",
                    type: 'string'
                }
            ]
        });    
    }

    async run(msg, { citation, auteur }) {
        msg.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} ajoutée par ${msg.author} à la base de données.`);
        db.defaults({ citations: [] })
          .write()
        db.get('citations')
          .push({citations: `${citation}`,
            contributeur: `${msg.author}`,
            auteurs: `${auteur}`
          })
          .write();
    }}