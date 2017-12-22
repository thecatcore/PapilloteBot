const tell_citation = (db, message) => {
    citation_random();
        console.log(randnum);

        const citation = db.getOneCitationById(randnum);
        const citationValue = citation.citation_value;
        const contributor_citation = citation.citation_contributor;

        console.log(citation);


        var tellcitation_embed = new Discord.RichEmbed()
          .setColor('#D9F200')
          .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
          .addField("Citation :", `${citation}`)
          .addField("Contributeur :", `${contributor_citation}`)
          .setTimestamp();
        message.channel.sendEmbed(tellcitation_embed)
        console.log(tellcitation_embed)
}

module.exports = tell_citation;
