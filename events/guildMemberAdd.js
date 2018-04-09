const Discord = require("discord.js")
const newUsers = [];
module.exports = (client, member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
        newUsers[guild.id].set(member.id, member.user);
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    guild.channels.find("name", "general").send("Bienvenue sur le serveur !\n" + userlist);
    newUsers[guild.id].clear();
}