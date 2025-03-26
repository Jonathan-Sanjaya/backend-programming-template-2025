const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const offset = Number(request.query.offset) || 0;
    const limit = Number(request.query.limit) || 10;
    
    const books = await booksService.getBooks(offset, limit);
    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function getBook(request, response, next) {
  try {
    const user = await booksService.getBook(request.params.title);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Book not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.create(title);

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

async function deleteBook(request, response, next) {
  try {
    const success = await booksService.deleteBook(request.params.title);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete book'
      );
    }

    return response.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    return next(error);
  }
}


async function updateBook(request, response, next) {
  try {
    const { title } = request.body;

    // User must exist
    const book = await booksService.getBook(request.params.title);
    if (!book) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Book not found');
    }

    // Title is required and cannot be empty
    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    // Email must be unique, if it is changed
    if (title !== book.title && (await booksService.booksExists(title))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await booksService.updateBook(request.params.title, title);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update book'
      );
    }

    return response.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
