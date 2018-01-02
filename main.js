const Discord = require('discord.js');
const schedule = require('node-schedule');
const config = require('./config.json');
const db = require('./src/db');
const addcitation = require('./src/commands/addcitations');
const help = require('./src/commands/help');
const tell_citation = require('./src/commands/tellcitation');
const addanniversaire = require('./src/commands/addanniversaire');
const annivlist = require('./src/commands/annivlist');
const info = require('./src/commands/info');

var bot = new Discord.Client();
var prefix = "+"

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
      message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author}`))
  .catch(console.error);  
      help(message);
    }

    switch (args[0].toLowerCase()) {

      case "addcitation":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        addcitation(db, message);
        break;

      case "tellcitation":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        const randnum = citation_random();
        tell_citation(db, message, randnum);
        break;

      case "addanniversaire":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        addanniversaire(db, message);
        break;

      case "annivlist":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        //annivlist(db, message);
        message.reply("Cette commande est en développement");
        break;

      case "info":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        info(message);
        break;

    }

  });
}
  


function citation_random() {
  const min = Math.ceil(0);
  const max = Math.floor(db.getCountOfCitations());

  return Math.floor(Math.random() * (max - min) + min);
}

function tellcitation() {
  const randnum = citation_random();

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