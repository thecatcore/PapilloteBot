const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");

const connect = () => {
  const adapter = new FileSync("database.json");
  return low(adapter);
};

const connect2 = () => {
  const adapter1 = new FileSync("guildsinfo.json");
  return low(adapter1);
};

const init = () => {
  const db = connect();
  db.defaults({ citations: [] }) 
    .write();
  db.defaults({ annivs: [] }) 
    .write();
  const db1 = connect2();
  db1.defaults({ guilds: [] })
     .write();
};

const getCountOfAnnivdate = () => {
  const db = connect();

  return db.get("annivs")
    .size()
    .value();
};

const getCountOfGuilds = () => {
  const db = connect2();

  return db.get("guilds")
    .size()
    .value();
};

const getOneAnnivById = (id) => {
  const db = connect();

  return db.get(`anniv[${id}]`).value();
};

const addCitation = (citation) => {
  const db = connect();

  db.get("citations")
    .push(citation)
    .write();
};

const addGuild = (guild) => {
  const db = connect2();

  db.get("guilds")
    .push(guild)
    .write();
};

const addAnniversaire = (anniv) => {
  const db = connect();

  db.get("annivs")
    .push(anniv)
    .write();
};

module.exports = {
  init,
  addAnniversaire,
  getCountOfAnnivdate,
  getOneAnnivById,
  addGuild,
  getCountOfGuilds
};
