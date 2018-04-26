const fs = require("fs")
const firebase = require("firebase")
exports.run = (client, msg) => {
const guild = msg.guild;
var database = firebase.database();
var ref = database.ref(`server/${guild.id}/lang`);
function gotData(data) {
    var lang = data.node_.value_;
    const serverlang = require(`./langs/${lang}.json`)
    msg.channel.send(serverlang.langlist)
    fs.readdir("./commands/langs/", (err, files) => {

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