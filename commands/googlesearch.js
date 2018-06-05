exports.run = (client, message, args) => {/*
    Example By Nomsy#7453
    
    This will require knowledge of ES7's await/async functions found in node 7+

    REMINDER: <Message> is what you defined in the <Client>.on('<Message>', <Message>) event.
*/
console.log(args)
var arg = args[0]
for (var c = 1; c < args.length; c++) {
  arg = arg + "+" + args[c];
}
console.log(arg)
// The modules we are using are cheerio, snekfetch, and querystring for this.
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');

// Depending on your command framework (or if you use one), it doesn't have to
// edit messages so you can rework it to fit your needs. Again, this doesn't have
// to be async if you don't care about message editing.
async function googleCommand() {

   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.fr/search?q=${encodeURIComponent(arg)}`;

   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {
    console.log(result)
    console.log(result.text)
      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.body);
    console.log($)
      // This is allowing us to grab the URL from within the instance of the page (HTML)
      var resultlist = $('.r').toArray()
      let googleData = [];
      for (var a = 0; a < resultlist.length; a++) {
        googleData[a] = resultlist[a].children[0].attribs.href
        console.log(googleData[a])
      }
      // Now that we have our data from Google, we can send it to the channel.
      var finalmessage = `Résultats trouvés :`
      for (var b = 0; b < googleData.length; b++) {
      googleData[b] = querystring.parse(googleData[b].replace('/url?', ''));
      finalmessage = finalmessage + `\n${b+1} : ` + googleData[b].q
      console.log(googleData[b])
      }
      console.log(finalmessage)
      searchMessage.edit(finalmessage);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
       console.log(err)
     message.reply("Erreur !!!! : " + err);
     searchMessage.edit('No results found!');
  });
}
    googleCommand();
};
