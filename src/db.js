const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');

const connect = () => {
  const adapter = new FileSync('database.json');

  return low(adapter);
};

const init = () => {
  const db = connect();
  db.defaults({ citations: [] }) .write();
};

const getCountOfCitations = () => {
  const db = connect();

  return db.get('citations')
    .size()
    .value();
}

/**
 * @param {*} id identifiant de la citation 
 */
const getOneCitationById = (id) => {
  const db = connect();

  return db.get(`citations[${id}]`).value();
}

const addCitation = (citation) => {
  const db = connect();

  db.get('citations')
    .push(citation)
    .write();
};

const addAnniversaire = (anniv) => {
  const db = connect();

  db.get('annivs')
    .push(anniv)
    .write();


module.exports = {
  init,
  getCountOfCitations,
  getOneCitationById,
  addCitation,
  addAnniversaire,
};
