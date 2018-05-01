exports.run = (client) => {
    var ref = client.db.ref("recette")
    ref.push({
        name:"gâteau au chocolat",
        ingrédients:"100g de beurre\n100g de chocolat\n3 oeufs entiers\n100g de sucre\n60g de farine"
    })
    function gotData(data) {
        console.log(data);
    }
    function errData(err) {
        console.log(err);
    }
    
    ref.on("value", gotData, errData);
}