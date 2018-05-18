exports.run = (client, message, [type, number, ...texttocode]) => {
  if (type=="server") {
    if (number==undifined) return message.reply(numbererror)
    var a;
    var b;
    var texttocoded = texttocode.split("")
    console.log(texttocoded)
    var textcoding = ""
    for (b=0;b < texttocode.length;b++) {
      const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      var oletter;
    for (a=0;a < alphabet.length;a++) {
      oletter = texttocoded[b];
      console.log(oletter)
      var cletter
      var cletternum
      var oletternum
      if (oletter == alphabet[a]) {
        oletternum = a;
        console.log(oletternum);
        cletternum = oletternum + number;
        console.log(oletternum + "->" + cletternum);
        cletter = alphabet[cletternum];
        console.log(oletter + "->" + cletter);
        textcoding = textcoding + cletter;
        console.log(textcoding)
      }
    }
    }
    const Discord = require("discord.js")
    var resultembed = new Discord.RichEmbed()
      .settitle("Voici votre message codé)
  } else if (type=="dm") {
    if (number==undifined) return message.reply(numbererror)
  } else {
    return message.reply(typeerror)
  }
}
