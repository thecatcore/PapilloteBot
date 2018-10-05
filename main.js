const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Enmap = require("enmap");

const firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBS7yIZr45Y1yrWBalCpO3Y2bkS5OYJQQY",
    authDomain: "papillotebot.firebaseapp.com",
    databaseURL: "https://papillotebot.firebaseio.com",
    projectId: "papillotebot",
    storageBucket: "papillotebot.appspot.com",
    messagingSenderId: "68194330678"
};
firebase.initializeApp(config);
client.db = firebase.database();
client.config = {};
client.config.prefix = "+";

if (!process.env.BOT_TOKEN) {
    console.log("Vous n'êtes pas sur heroku ?");
    var configfile = require("./config.json");
    if (!configfile.token) {
        console.log("Il manque le token idiot !");
    } else {
        client.config.token = configfile.token;
        
    }
} else {
    client.config.token = process.env.BOT_TOKEN;
}
client.login(client.config.token);
fs.readdir("./events/", (err, files) => {

    if (err) {

        return console.error(err);

    }
    files.forEach((file) => {

        if (!file.endsWith(".js")) {

            return;

        }
        let event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));

    });

});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) {
        return console.error(err);
    }
    files.forEach((file) => {
        if (!file.endsWith(".js")) {
            return;
        }
        // Load the command file itself
        let props = require(`./commands/${file}`);
        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        // Here we simply store the whole thing in the command Enmap. We're not running it right now.
        client.commands.set(commandName, props);
  });
});
