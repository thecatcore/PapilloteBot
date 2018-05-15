exports.run = (client, message, [type, number, ...texttocode]) => {
  if (type=="server") {
    if (number==undifined) return message.reply(numbererror)
    var a;
    var b;
    var texttocoded = texttocode.split("")
    var textcoding = ""
    for (b=0;b < texttocode.length;b++) {
      const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    for (a=0;a < alphabet.length;a++)
      if (texttocoded[b] == alphabet[a]) {
        var textcoding = textcoding + texttocoded[b]
      }
    }
    }
  } else if (type=="dm") {
    if (number==undifined) return message.reply(numbererror)
  } else {
    return message.reply(typeerror)
  }
}
