exports.run = (client, message, [type, number, ...texttocode]) => {
  if (type=="server") {
    if (number==undifined) return message.reply(numbererror)
  } else if (type=="dm") {
    if (number==undifined) return message.reply(numbererror)
  } else {
    return message.reply(typeerror)
  }
}
