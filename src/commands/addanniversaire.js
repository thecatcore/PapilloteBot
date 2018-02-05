const addanniversaire = (db, message) => {
  const date = message.content.substr(17);
  const annivperso = message.author.toString();

  console.log(date);
  message.reply("Ajout de la date d'anniversaire à la base de données");

  db.addAnniversaire({
    anniv_date: date,
    anniv_annivperso: annivperso
  });
};

module.exports = addanniversaire;
