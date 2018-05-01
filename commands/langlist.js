exports.run = (client, msg) => {
const guild = msg.guild;
var ref = client.db.ref(`server/${guild.id}/lang`);
function gotData(data) {
    var serverlang = data.node_.value_;
    var lang = client.db.ref(`langs/${serverlang}/langlist`);
    function gotDataa(dataa) {
        var langlist = dataa.node_.value_;
        msg.channel.send(`${langlist}\nen_US\nfr_FR`);
    }
    function errDataa(erra) {
        msg.channel.send(`Erreur: ${erra}`);
    }
    lang.on("value", gotDataa, errDataa);
}
function errData(err) {
    msg.channel.send(`Erreur: ${err}`);
}

ref.on("value", gotData, errData);
};