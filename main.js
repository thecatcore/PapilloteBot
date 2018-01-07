const Discord = require('discord.js');
const schedule = require('node-schedule');
const config = require('./config.json');
const configg = require('./config.1.json')
const db = require('./src/db');
const prefix = config.prefix;
const addcitation = require('./src/commands/addcitations');
const help = require('./src/commands/help');
const tell_citation = require('./src/commands/tellcitation');
const addanniversaire = require('./src/commands/addanniversaire');
const annivlist = require('./src/commands/annivlist');
const info = require('./src/commands/info');
const weather = require('weather-js');
const meteo = require('./src/commands/meteo')
const bot = new Discord.Client();
const superagent = require("superagent");
const uptimebase = Date();
console.log(uptimebase);


// const fs = require("fs");
// bot.commands = new Discord.Collection();

// fs.readdir("./src/commands", (err, files) => {
//   if(err) console.error(err);

//   let jsfiles = files.filter(f => f.split(".").pop() === "js");
//   if(jsfiles.length <= 0) {
//     console.log("Pas de commandes a charger");
//     return;
//   }

//   console.log(`Nombre de commandes chargées: ${jsfiles.length} !`)

//   jsfiles.forEach((f, i) => {
//     let props = require(`./src/commands/${f}`);
//     console.log(`${i + 1}: ${f} chargée !`);
//     bot.commands.set(props.config.command, props);
//   });
// });

db.init();

bot.login(configg.token)
  .then(() => {
  console.log('Bot logged in');
  const channel = bot.channels.get(config.channel);
  bot.guilds.find("name", "Break Star").channels.find("name", "bot-spam").send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");
  bot.guilds.find("name", "Villageoiscraft").channels.find("name", "bot-spam").send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");

 onLogin();
})
.catch((error) => {
  console.error(error);
});

bot.on('ready', async () => {
  
  bot.user.setPresence({
    game: {
      name: '+help',
      type: 0
    }
  });
  console.log("Bot Ready !");
  //console.log(bot.commands)


});

function onLogin() {
  bot.generateInvite(["ADMINISTRATOR"]).then(link => {
    var ilink = link
  
  var interval = setInterval(tellcitation, 1000 * 60 * 60 * 1);
  tellcitation();
  var catinterval = setInterval(cat, 1000 * 60 * 1);
  cat();

  bot.on("message", async message => {
    if(!message.content.startsWith(prefix)) return;
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
        annivlist(db, message);
        message.reply("Cette commande est en développement");
        break;

      case "info":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
        var s = (Math.round(bot.uptime / 1000) % 60)
        var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
        var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        info(message,ilink,s, m, h);
        break;

      case "meteo":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
      meteo(message, args);
      break;

      case "cat":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
      const { body } = await superagent
	   .get('http://random.cat/meow');
	   const embed = new Discord.RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Meow :cat:")
	   .setImage(body.file)
	   message.channel.send({embed})
      break;

    }

  });
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
    bot.guilds.find("name", "Break Star").channels.find("name", "bot-spam").send(tellcitation_embed);
    bot.guilds.find("name", "Villageoiscraft").channels.find("name", "bot-spam").send(tellcitation_embed);
}

async function cat()  {
  const { body } = await superagent
	   .get('http://random.cat/meow');
	   const catembed = new Discord.RichEmbed()
	   .setColor(0x954D23)
     .addField("Cat!!!", "Chat")
     .setImage(body.file)
     bot.guilds.find("name", "Villageoiscraft").channels.find("name", "cat-spam").send(catembed);
}