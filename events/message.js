const Discord = require("discord.js");

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) {
    return;
  }
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) {
    return;
  }
  var ref = client.db.ref("recette");
  function gotData(data) {
    var recette = data.val();
    var keys = Object.keys(recette);
    var length = keys.length;
    var i;
    for (i=0;i < length;i++) {
      var k = keys[i];
      if (message.content === client.config.prefix + recette[k].name) {
        var recettes = recette[k];
        var nom = recettes.name;
        var ingrédients = recettes.ingrédients;
        var étapes = recettes.étapes;
        var étapess = Object.keys(étapes);
        var étapesLength = étapess.length;
        var recetteEmbed = new Discord.RichEmbed()
          .setTitle(nom)
          .addField("Ingrédients", ingrédients);
        if (recettes.image) {
          recetteEmbed.setImage(recettes.image);
        }
        for (var e = 0;e < étapesLength; e++) {
          var é = étapess[e];
          var f = e + 1;
          recetteEmbed.addField(`Étape ${f}: `, étapes[é].description);
        }
        if (recettes.options) {
          var options = recettes.options;
          var optionss = Object.keys(options);
          var optionsLength = optionss.length;
          for (var r = 0;r < optionsLength; r++) {
            var t = optionss[r];
            recetteEmbed.addField(`Option ${options[t].name}: `, options[t].ingrédients);
          }
        }
        console.log(recetteEmbed);
        message.channel.send(recetteEmbed);
      }
    }
  }
  function errData(err) {
    console.log(err);
  }

  ref.on("value", gotData, errData);
  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) {
    return;
  }
  // Run the command
  cmd.run(client, message, args);
};
