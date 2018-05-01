exports.run = (client) => {
    var ref = client.db.ref("recette/-LBQZb9IOU52GVIIGkqs/étapes")
    function gotData(data) {
        console.log(data.val());
    }
    function errData(err) {
        console.log(err);
    }
    
    ref.on("value", gotData, errData);
}