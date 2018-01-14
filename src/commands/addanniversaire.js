const addanniversaire = (db, message) => {
  const date = message.content.substr(17);
  const annivperso = message.author.toString();

  console.log(date);
  message.reply("Ajout de la date d'anniversaire à la base de données")

  db.addAnniversaire({
    anniv_date: date,
    anniv_annivperso: annivperso
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

module.exports = addanniversaire;
