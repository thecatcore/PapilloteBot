exports.run = async (client, message) => {
    var commandlista = client.commands.keyArray()
    var helpmessagee = "Liste des commandes du bot :"
    var helpmessage = await message.channel.send(helpmessagee)
    for (var a = 0; a < commandlista.length; a++) {
        helpmessagee = helpmessagee + `\n${commandlista[a]}`
        helpmessage.edit(helpmessagee)
    }
    helpmessagee = helpmessagee + "\n pour rappel le prefix est ```+```"
    helpmessage.edit(helpmessagee)
}