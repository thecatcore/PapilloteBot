module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) {
    return;
  }
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) {
    return;
  }
  var ref = client.db.ref("recette")
  function gotData(data) {
    console.log(data);
  }
  function errData(err) {
    console.log(err);
  }

  ref.on("value", gotData, errData);
  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) {
    return;
  }
  // Run the command
  cmd.run(client, message, args);
};