const fs = require("fs")
const firebase = require("firebase")
exports.run = (client, msg) => {
const serverlang = require(`./langs/${server.lang}`)
msg.channel.send(serverlang.langlist)
fs.readdir("./langs/", (err, files) => {

    if (err) {

        return console.error(err)

    }
    files.forEach((file) => {

        if (!file.endsWith(".json")) {

            return

        }
        let langName = file.split(".")[0]

        msg.channel.send(langName);

    })

})
const guild = member.guild;
var ref = database.ref(`server/${guild.id}`);
function gotData(data) {
    var info = data.val();
    console.log(info)
    var infos = Object.keys(info);
    // var length = keys.length;
    // var idd = Math.floor(Math.random() * length);
    // var id = idd;
    // console.log(id);
    // var k = keys[id];
    // console.log(citations[k]);
    // var citiation = citations[k].citation;
    // var aut = citations[k].auteur;
    // var cont = citations[k].contributeur;
    // const embed = new RichEmbed()
    // .setColor("#D9F200")
    // .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
    // .setTitle("Citation :")
    // .setDescription(`${citiation}\nde ${aut}, ajoutée par ${cont} à la base de donnée.`);
    // msg.embed(embed);
}
function errData(err) {
    console.log("Erreur !");
    console.log(err);
}

ref.on("value", gotData, errData);
}
