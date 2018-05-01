exports.run = (client) => {
    var ref = client.db.ref("recette")
    function gotData(data) {
        console.log(data.val());
    }
    function errData(err) {
        console.log(err);
    }
    
    ref.on("value", gotData, errData);
}