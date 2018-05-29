const Discord = require("discord.js");
const newUsers = [];
const firebase = require("firebase");
module.exports = (client, member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) {
        newUsers[guild.id] = new Discord.Collection();
    }
    newUsers[guild.id].set(member.id, member.user);
    const userlist = newUsers[guild.id].map((u) => u.toString()).join(" ");
    guild.channels.find("name", "general").send("Bienvenue sur le serveur !\n" + userlist);
    newUsers[guild.id].clear();
    message.channel(450692646940180500).send(`Le joueur ${member.name} avec l'id ${member.id} a rejoint le serveur ${guild.name} avec l'id ${guild.id} !`)
};
