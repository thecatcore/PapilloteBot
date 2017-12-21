const Discord = require('discord.js');
const schedule = require('node-schedule');
const config = require('./config.json');
const db = require('./src/db');
const addcitation = require('./src/commands/addcitations');

var bot = new Discord.Client();
var prefix = config.prefix;
var randnum = 0;

db.init();

bot.login(config.token)
.then(() => {
  console.log('Bot logged in');
  const channel = bot.channels.get(config.channel);
  channel.send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");

  onLogin();
})
.catch((error) => {
  console.error(error);
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
        addcitation(db, message);
        break;

      case "tellcitation":
        addcitation();
        break;
    }

  });
}


function citation_random(min, max) {
  min = Math.ceil(0);
  console.log(db.getCountOfCitations());
  max = Math.floor(db.getCountOfCitations());
  randnum = Math.floor(Math.random() * (max - min) + min);
}

function tellcitation() {
  citation_random();
  console.log(randnum);

  const citation = db.getOneCitationById(randnum);
  const citationValue = citation.citation_value;
  const contributor_citation = citation.citation_contributor;

  console.log(citation);

  const tellcitation_embed = new Discord.RichEmbed()
    .setColor('#D9F200')
    .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
    .addField("Citation de l'heure :", `${citationValue}`)
    .addField("Contributeur :", `${contributor_citation}`)
    .setTimestamp();
    
    const channel = bot.channels.get('230688990913757185');
    channel.send(tellcitation_embed)
}
