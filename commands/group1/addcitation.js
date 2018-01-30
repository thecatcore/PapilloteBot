const Commando = require('discord.js-commando');
const path = require('path');
const { Command } = require('discord.js-commando');



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
                    key: "donneur",
                    prompt: "qui a ajouté cette citation ?",
                    type: 'user'
                },
                {
                    key: "auteur",
                    prompt: "Qui est a l'origine de la citation ?",
                    type: 'string'
                }
            ]
        });    
    }

    async run(msg, { citation, donneur, auteur }) {
        
};