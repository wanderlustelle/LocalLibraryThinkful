
//get total count of books
function getTotalBooksCount(books) {
  return books.length;
}
//get total accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}
// get books borrowed count 
function getBooksBorrowedCount(books) {
  return books.reduce((totalBorrowed, book) => {
    const borrowedCount = book.borrows.filter(borrow => !borrow.returned).length;
    return totalBorrowed + borrowedCount;
  }, 0);
}

//get most common genres
function getMostCommonGenres(books) {
  const genreCounts = books.reduce((genreAccumulator, { genre }) => {
    genreAccumulator[genre] ? genreAccumulator[genre]++ : (genreAccumulator[genre] = 1);
    return genreAccumulator;
  }, {});

  const genreArray = Object.entries(genreCounts).map(([name, count]) => ({ name, count }));

  const sortedGenres = genreArray.sort((a, b) => b.count - a.count);

  const topGenres = sortedGenres.slice(0, 5);

  return topGenres;
}

//get most popular books
function getMostPopularBooks(books) {
  const sortedBooks = books
    .map(book => ({ name: book.title, count: book.borrows.length }))
    .sort((bookA, bookB) => bookB.count - bookA.count);

  return sortedBooks.filter((book, index) => index < 5);
}
// helper function to get author name
const getAuthorName = (author) => `${author.name.first} ${author.name.last}`;

//  get most popular authors
function getMostPopularAuthors(books, authors) {
  const authorCounts = books.reduce((popular, { authorId, borrows }) => {
    const author = authors.find(author => author.id === authorId);
    const authorName = getAuthorName(author);
    popular[authorName] = (popular[authorName] || 0) + borrows.length;
    return popular;
  }, {});

  const sortedAuthors = Object.entries(authorCounts).sort(([, countA], [, countB]) => countB - countA).slice(0, 5);

  return sortedAuthors.map(([authorName, count]) => ({
    name: authorName,
    count
  }));
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
