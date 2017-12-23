const addanniversaire = () => {
  const date = message.content.substr(17);
  const annivperso = message.author.toString();

  console.log(value);
  message.reply("Ajout de la citation à la base de données")

  db.addAnniversaire({
    anniv_date: date,
    anniv_annivperso: annivperso
});
};

module.exports = addanniversaire
