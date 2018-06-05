exports.run = (client, message) => {
  var mss = client.uptime;
  var secondee = Math.floor(mss/1000);
  var minutee = Math.floor(secondee/60);
  var heuree = Math.floor(minutee/60);
  var jour = Math.floor(heuree/24);
  var ms = mss - (secondee * 1000);
  var seconde = secondee - (minutee * 60);
  var minute = minutee - (heuree * 60);
  var heure = heuree - (jour * 24);
  console.log("ms : " + ms + " ou " + mss);
  message.channel.send(`Le bot est en ligne depuis ${ms} millisecondes, ${seconde} secondes, ${minute} minutes, ${heure} heures et ${jour} jour(s)`);
};
