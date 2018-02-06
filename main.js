
const Commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const configg = require('./config.1.json')
//const sqlite = require('sqlite');


const client = new Commando.Client({
  commandPrefix: config.prefix,
  owner: [config.owner1, config.owner2],
  disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Citations Commands'],
        ['group2', 'Say Commands'],
        ['group3', 'Images Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
      help: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
      console.log('Logged in!');
      client.user.setPresence(`${config.prefix}help`);
});

client.login(configg.token);

//client.setProvider(
  //sqlite.open(path.join(__dirname, '.db.sqlite3')).then(db => new Commando.SQLiteProvider(db))
//).catch(console.error);
