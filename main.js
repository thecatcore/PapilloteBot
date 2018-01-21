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
const osu_info = require('./src/commands/osu_info');
const ov_info = require('./src/commands/overwatch_info');
const recettes = require('./recettes.json');
console.log(uptimebase);
console.log(recettes.recette);

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

  //Guild = bot.guilds.find("name", "Break Star");
     //bot.channels.find("name", "bot-spam").send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");
  //Guild = bot.guilds.find("name", "Villageoiscraft");
     bot.channels.find("name", "bot-spam").send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");

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
    
    if (message.author.bot) return;
    const speaking = require('./src/commands/speak');
      speaking(message);
    if(!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    if (message.content === prefix + "help") {
      message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author}`))
  .catch(console.error);  
      
      help(db,message);
    }
    var i = 0;
    console.log(recettes.recette);
    console.log(i);
    do {
      
    console.log(i);
    console.log(recettes.recette[i].name)
      if (message.content === prefix + recettes.recette[i].name) {
        
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author}`))
        .catch(console.error);
        var recette_embed = new Discord.RichEmbed()
          .setTitle(recettes.recette[i].name)
          .addField('Ingrédients', recettes.recette[i].ingrédients);
          let ii = 0;
          do {
            //console.log(ii);
            recette_embed
            .addField(`Etape ${ii + 1}`, recettes.recette[i].étapes[ii]);
            
            ii++;
          } while (ii < recettes.recette[i].étapes.length);
          message.channel.send(recette_embed);
          if (recettes.recette[i].options) {
          var recette_embede = new Discord.RichEmbed()
            .setTitle('Options facultatives de cette recette');
            let iii = 0;
            do {
              //console.log(ii);
              recette_embede
              .addField(`Option ${iii + 1}, Nom`, recettes.recette[i].options[iii].name)
              .addField(`Information de cette option`, recettes.recette[i].options[iii].ingrédients);
              
              iii++;
            } while (iii < recettes.recette[i].options.length);
            message.channel.send(recette_embede);}
        }
        i++;
        console.log(i);
        } while (i < recettes.recette.length + 1);
    

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
        info(db,message,ilink,s, m, h);
        break;

      case "meteo":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
      meteo(db,message, args);
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

      case "osu_info":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
      console.log('tet');
      osu_info(message);
      break;

      case "ov_info":
      message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author}`))
      .catch(console.error);
      ov_info(message);
      break;

    }

  })
})
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
    //bot.guilds.find("name", "Break Star")
       //bot.channels.find("name", "bot-spam")
       //.send(tellcitation_embed);
    bot.guilds.find("name", "Villageoiscraft")
       .channels.find("name", "bot-spam")
       .send(tellcitation_embed);
}

async function cat() {
  
  const { body } = await superagent
     .get('http://random.cat/meow')
     //.setImage();
     console.log(body.file)
     
     bot.guilds.find("name", "Villageoiscraft").channels.find("name", "cat-spam").send(body.file);
     
}