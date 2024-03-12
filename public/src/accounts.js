function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1);
}


function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
    return totalBorrows + borrowCount;
  }, 0);
}

// helper function to check if book is checked out by the given account
function isBookCheckedOutByAccount(accountId, book) {
  const recentBorrow = book.borrows[0];
  return !recentBorrow.returned && recentBorrow.id === accountId;
}

// get books "possessed" by the account
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books
    .filter(book => isBookCheckedOutByAccount(accountId, book))
    .map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
