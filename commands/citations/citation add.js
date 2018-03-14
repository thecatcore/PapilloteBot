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
        ref.on('value', gotData, errData);
        function gotData (data) {

        }
        function errData (err) {
            
        }
        msg.channel.send(`Ajout de la citation:\n${citation}\nde ${auteur} par ${msg.author} à la base de données.`);
        var cont = new String(msg.author)
        var data = {
            citation: citation,
            auteur: auteur,
            contributeur: cont.toString()
        }
        ref.push(data);
    }};
