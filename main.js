const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const schedule = require('node-schedule');

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({
    citations: []
  })
  .write()

var bot = new Discord.Client();
var prefix = ("+");
var randnum = 0

var citationnumber = db.get('citations').map('citation_value').value();

bot.login('MzkxMjkyNDU4MDc3NzgyMDE2.DRWjBQ.HqnLS_BQIaMQRuVYAXTMkIJjllI')
.then(() => {
  console.log('Bot logged in');
  onLogin();
})
.catch(() => {
  console.log('Error login');
});

bot.on('ready', () => {
  bot.user.setPresence({
    game: {
      name: '+help Bot Test',
      type: 0
    }
  });
  console.log("Bot Ready !");

  
});

function onLogin() {
  var interval = setInterval(tellcitation, 1000 * 60 * 60 * 1);
  tellcitation();

  bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    if (message.content === prefix + "help") {
      var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Prefix", "c'est le signe + ")
        .addField("Commandes du Bot", "-help : affiche les commandes du bot\n-addcitation <citation+auteur> : permet d'ajouter une citation\npour la commande +tellcitation \n-tellcitation : écris une citation au hasard parmis les citations enregistrées")
      message.channel.sendEmbed(help_embed);
      console.log("Help command");
    }

    switch (args[0].toLowerCase()) {

      case "addcitation":
        var value = message.content.substr(10);
        var contributor = message.author.toString();
        var number = db.get('citations').map('id').value();
        console.log(value);
        message.reply("Ajout de la citation à la base de données")

        db.get('citations')
          .push({
            citation_value: value,
            citation_contributor: contributor
          })
          .write()

        break;

      case "tellcitation":

        citation_random();
        console.log(randnum);

        var citation = db.get(`citations[${randnum}].citation_value`).toString().value();
        var contributor_citation = db.get(`citations[${randnum}].citation_contributor`).toString().value();
        console.log(citation);


        var tellcitation_embed = new Discord.RichEmbed()
          .setColor('#D9F200')
          .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
          .addField("Citation :", `${citation}`)
          .addField("Contributeur :", `${contributor_citation}`)
          .setTimestamp();
        message.channel.sendEmbed(tellcitation_embed)
        console.log(tellcitation_embed)
        break;
    }

  });
}


function citation_random(min, max) {
  min = Math.ceil(0);
  max = Math.floor(32);
  randnum = Math.floor(Math.random() * (max - min) + min);
}

function tellcitation() {
  citation_random();
  console.log(randnum);

  var citation = db.get(`citations[${randnum}].citation_value`).toString().value();
  var contributor_citation = db.get(`citations[${randnum}].citation_contributor`).toString().value();
  console.log(citation);

  var tellcitation_embed = new Discord.RichEmbed()
    .setColor('#D9F200')
    .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
    .addField("Citation de l'heure :", `${citation}`)
    .addField("Contributeur :", `${contributor_citation}`)
    .setTimestamp();

    
    const channel = bot.channels.get('230688990913757185');
    channel.send(tellcitation_embed)
}