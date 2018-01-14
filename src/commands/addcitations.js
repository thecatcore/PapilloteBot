// Add a citation 
const addcitation = (db, message) => {
  const value = message.content.substr(13);
  const contributor = message.author.toString();
  message.reply("Ajout de la citation à la base de données")

  db.addCitation({
    citation_value: value,
    citation_contributor: contributor
  });
  const guildname = message.guild.name
    const guildid = message.guild.id
    const guildregion = message.guild.region
    console.log(guildregion)
    console.log(message.guild.roles)
    
    db.addGuild({
        nom: guildname,
        id: guildid,
        region: guildregion
      
    });
};

module.exports = addcitation;
