exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.find("name", "Mods");
    if (!modRole) {
      return message.reply("Le rôle modérateur n'existe pas !");
    }
    if (!message.member.roles.has(modRole.id)) {
      return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
    }
    if (message.mentions.members.size === 0) {
      return message.reply("Veuillez mentionner la personne à kick");
    }
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.reply("Vous n'avez pas la permission d'utiliser cette commande !");
    }
    const kickMember = message.mentions.members.first();
  
    kickMember.kick(reason.join(" ")).then(member => {
      message.reply(`${member.user.username} a été kick avec succès parce que ${reason} !`);
    });
  };