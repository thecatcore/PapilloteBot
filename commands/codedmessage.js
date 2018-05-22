exports.run = (client, message, [type, number, ...texttocode]) => {
  if (type=="server") {
    if (!number) return message.reply(numbererror)
    var a;
    var b;
    var c;
    var word;
    var texttocoded = "";
    for (c=0;c < texttocode.length; c++) {
    word = texttocode[c].split("")
    console.log(word)
    
    var textcoding = ""
    var cletter
      var letternum
      const alphabetlower = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      const alphabetupper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      var oletter;
    for (b=0;b < word.length;b++) {
      oletter = word[b];
      if (oletter == "'" || oletter ==  "." || oletter ==  "?" || oletter ==  "!" || oletter == ",") {
        textcoding = textcoding + oletter
      } else {
      for (a=0;a < alphabetlower.length;a++) {
        if (oletter === alphabetlower[a]) {
          letternum = a;
          letternum = letternum + Number(number);
          if (letternum >= 25) {
            cletter = alphabetlower[letternum - 26]
          }else{
          cletter = alphabetlower[letternum];
          }
          console.log(oletter + "->" + cletter);
          textcoding = textcoding + cletter;
        
        } else {
          if (oletter === alphabetupper[a]) {
            letternum = a;
          letternum = letternum + Number(number);
          if (letternum >= 25) {
            cletter = alphabetupper[letternum - 26]
          }else{
          cletter = alphabetupper[letternum];
          }
          console.log(oletter + "->" + cletter);
          textcoding = textcoding + cletter;
          }
        }
      }
    }
    }
    console.log(textcoding)
    texttocoded = texttocoded + " " + textcoding
  }
  const {RichEmbed} = require("discord.js")
    var resultembed = new RichEmbed()
      .setTitle("Voici votre message codé")
      .setDescription(texttocoded);
    return message.channel.send(resultembed)
  } else if (type=="dm") {
    if (number==undifined) return message.reply(numbererror)
  } else {
    return message.reply(typeerror)
  }
}
