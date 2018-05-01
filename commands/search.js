// The modules we are using are cheerio, snekfetch, and querystring.
const cheerio = require("cheerio"),
      snekfetch = require("snekfetch"),
      querystring = require("querystring");

// Depending on your command framework (or if you use one), it doesn""t have to
// edit messages so you can rework it to fit your needs. Again, this doesn""t have
// to be async if you don""t care about message editing.
exports.run = (client, message, args) => {
      var arg = args[0];
      for (var i = 1;i < args.length; i++) {
      arg = arg + "-" + args[i];
      console.log(arg);
      }
async function googleCommand(msg, args) {

   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await msg.channel.send("Recherche...");
   console.log(args);
   let searchUrl = `https://www.google.fr/search?q=${args}`;

   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {
      console.log(result);
      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result);

      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $(".r").first().find("a").first().attr("href");

      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace("/url?", ""));
      searchMessage.edit(`Résultats trouvés!\n${googleData.q}`);

  // If no results are found, we catch it and return ""No results are found!""
  }).catch((err) => {
        console.log(err);
     searchMessage.edit("Pas de résultat trouvé!");
  });
}
googleCommand(message, arg);
};