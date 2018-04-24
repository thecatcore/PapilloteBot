const fs = require("fs")
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
}
