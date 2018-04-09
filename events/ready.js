module.exports = (client) => {
    console.log(`Prêt à être utiliser dans ${client.channels.size} channels sur ${client.guilds.size} servers, pour un total de ${client.users.size} utilisateurs.`);
  }