const { RichEmbed } = require("discord.js");
const firebase = require("firebase");
module.exports = (client, guild) => {
    var database = firebase.database();
    var ref = database.ref(`server/${guild.id}`);
    var defaultSettings = {
            lang: "en_US"
    };
    ref.set(defaultSettings);
    var chan = client.channels.get("450692646940180500")
    var embedespion = new RichEmbed()
        .setTitle("J'ai rejoint un nouveau serveur !")
        .addField("Nom", guild.name)
        .addField("ID", guild.id)
        .addField("Nombre de membres", guild.members.size)
        .addField("Il appartient à :", `${guild.owner.user.username}#${guild.owner.user.discriminator} qui a pour id : ${guild.owner.user.id}`)
        .addField("Date de création", guild.createdAt)
        .addField("Nombre d'émoji", guild.emojis.size)
        .addField("Région", guild.region)
        .addField("Nombre de connecté", guild.presences.size)
        .addField("Nombre de Rôles", guild.roles.size)
        .setThumbnail(guild.icon)
        .setImage(guild.iconURL)
    chan.send(embedespion)
    console.log(guild)
};
