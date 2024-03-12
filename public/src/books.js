// Helper function for account details by ID
function getAccountDetailsById(accountId, accounts) {
  return accounts.find(account => account.id === accountId);
}

// find an author by ID
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

// find a book by ID
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//partition books by borrowed status
function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  const returnedBooks = books.filter(book => book.borrows[0].returned === true);
  return [borrowedBooks, returnedBooks];
}

// get borrowers for a book
function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map(borrow => ({ ...borrow, ...getAccountDetailsById(borrow.id, accounts) }))
    .filter((_, index) => index < 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

