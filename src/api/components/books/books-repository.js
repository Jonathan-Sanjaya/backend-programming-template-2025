const { Books } = require('../../../models');

async function getBooks(offset = 0, limit = 10) {
  return Books.find({}).skip(offset).limit(limit);
}

async function create(title) {
  return Books.create({ title });
}

async function getBook(title) {
  return Books.findByTitle(title);
}

module.exports = {
  getBooks,
  create,
  getBook
};
