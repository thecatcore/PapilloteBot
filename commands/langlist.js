const fs = require("fs")
const firebase = require("firebase")
exports.run = (client, msg) => {
const guild = msg.guild;
var ref = database.ref(`server/${guild.id}`);
function gotData(data) {
    var info = data.val();
    console.log(info)
    var infos = Object.keys(info);
    // var length = keys.length;
    // var id = Math.floor(Math.random() * length);
    // console.log(id);
    // var k = keys[id];
    // console.log(citations[k]);
    // var citiation = citations[k].citation;
    // var aut = citations[k].auteur;
    // var cont = citations[k].contributeur;
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
}
function errData(err) {
    console.log("Erreur !");
    console.log(err);
}

ref.on("value", gotData, errData);
}
}
