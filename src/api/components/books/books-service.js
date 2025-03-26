const booksRepository = require('./books-repository');

async function getBooks(offset, limit) {
  return booksRepository.getBooks(offset, limit);
}

async function create(title) {
  return booksRepository.create(title);
}

async function updateBook(id, email, fullName) {
  return booksRepository.updateBook(id, email, fullName);
}

async function deleteBook(title) {
  return booksRepository.deleteBook(title);
}

module.exports = {
  getBooks,
  create,
  updateBook,
  deleteBook
};
