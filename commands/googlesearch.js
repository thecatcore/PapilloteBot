exports.run = (client, message, arg) => {/*
    Example By Nomsy#7453
    
    This will require knowledge of ES7's await/async functions found in node 7+

    REMINDER: <Message> is what you defined in the <Client>.on('<Message>', <Message>) event.
*/
var args = "";
for (var c = 0; c < arg.length; c++) {
  args = args + " " + arg[c];
}

// The modules we are using are cheerio, snekfetch, and querystring for this.
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');

// Depending on your command framework (or if you use one), it doesn't have to
// edit messages so you can rework it to fit your needs. Again, this doesn't have
// to be async if you don't care about message editing.
async function googleCommand(message, args) {

   // These are our two variables. One of them creates a message while we preform a search,
   // the other generates a URL for our crawler.
   let searchMessage = await message.reply('Searching... Sec.');
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(args)}`;

   // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
   // utilize that for our try/catch block.
   return snekfetch.get(searchUrl).then((result) => {

      // Cheerio lets us parse the HTML on our google result to grab the URL.
      let $ = cheerio.load(result.text);

      // This is allowing us to grab the URL from within the instance of the page (HTML)
      let googleData = $('.r').first().find('a').first().attr('href');
 
      // Now that we have our data from Google, we can send it to the channel.
      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  // If no results are found, we catch it and return 'No results are found!'
  }).catch((err) => {
     message.channel.send("Erreur !!!! : " + err);
     searchMessage.edit('No results found!');
  });
}
    googleCommand();
};
