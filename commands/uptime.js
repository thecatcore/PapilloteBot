exports.run = (client, message) => {
  var ms = client.uptime
  var seconde = Math.floor(ms/1000)
  var minute = Math.floor(seconde/60)
  var heure = Math.floor(minute/60)
  var jour = Math.floor(heure/24)
  message.channel.send(`Le bot est en ligne depuis ${ms} millisecondes, ${seconde} secondes, ${minute} minutes, ${heure} heures et ${jour} jour(s)`)
}
