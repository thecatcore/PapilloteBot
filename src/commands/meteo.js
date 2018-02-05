const Discord = require("discord.js");
const weather = require("weather-js");

const meteo = (db,message, args) => {
  weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
    if (err) message.channel.send(err);

    // We also want them to know if a place they enter is invalid.
    if (result.length === 0) {
        message.channel.send("**Entrez un nom de lieu valide !**"); // This tells them in chat that the place they entered is invalid.
        return; // This exits the code so the rest doesn't run.
    }

    // Variables
    var current = result[0].current; // This is a variable for the current part of the JSON output
    var location = result[0].location; // This is a variable for the location part of the JSON output
    // Let's use an embed for this.
    const embed = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
        .setAuthor(`Météo pour ${current.observationpoint}`) // This shows the current location of the weather.
        .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
        .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
        .addField("Temperature",`${current.temperature} °C`, true)
        .addField("Ressenti", `${current.feelslike} °C`, true)
        .addField("Vent",current.winddisplay, true)
        .addField("Humiditée", `${current.humidity}%`, true);

        // Now, let's display it when called
        message.channel.send({embed});
});
const guildname = message.guild.name;
    const guildid = message.guild.id;
    const guildregion = message.guild.region;
    console.log(guildregion);
    console.log(message.guild.roles);
    
    db.addGuild({
        nom: guildname,
        id: guildid,
        region: guildregion
      
    });
};

module.exports = meteo;
