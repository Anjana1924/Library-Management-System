import 'dotenv/config';
import mongoose from 'mongoose';
import Book from './models/Book';

const books = [
  { title: 'Clean Code', isbn: '9780132350884', author: 'Robert C. Martin', category: 'Programming', publisher: 'Prentice Hall', totalQty: 5 },
  { title: 'The Pragmatic Programmer', isbn: '9780135957059', author: 'Andrew Hunt, David Thomas', category: 'Programming', publisher: 'Addison-Wesley', totalQty: 4 },
  { title: 'Introduction to Algorithms', isbn: '9780262046305', author: 'Thomas H. Cormen', category: 'Computer Science', publisher: 'MIT Press', totalQty: 6 },
  { title: 'Design Patterns', isbn: '9780201633610', author: 'Erich Gamma', category: 'Software Engineering', publisher: 'Addison-Wesley', totalQty: 3 },
  { title: 'Database System Concepts', isbn: '9780078022159', author: 'Abraham Silberschatz', category: 'Databases', publisher: 'McGraw-Hill', totalQty: 4 },
  { title: 'To Kill a Mockingbird', isbn: '9780061120084', author: 'Harper Lee', category: 'Fiction', publisher: 'Harper Perennial', totalQty: 5 },
  { title: '1984', isbn: '9780451524935', author: 'George Orwell', category: 'Fiction', publisher: 'Signet Classic', totalQty: 6 },
  { title: 'Pride and Prejudice', isbn: '9780141439518', author: 'Jane Austen', category: 'Classic', publisher: 'Penguin Classics', totalQty: 4 },
  { title: 'The Great Gatsby', isbn: '9780743273565', author: 'F. Scott Fitzgerald', category: 'Classic', publisher: 'Scribner', totalQty: 5 },
  { title: 'A Brief History of Time', isbn: '9780553380163', author: 'Stephen Hawking', category: 'Science', publisher: 'Bantam', totalQty: 3 },
  { title: 'Sapiens', isbn: '9780062316097', author: 'Yuval Noah Harari', category: 'History', publisher: 'Harper', totalQty: 4 },
  { title: 'Atomic Habits', isbn: '9780735211292', author: 'James Clear', category: 'Self Help', publisher: 'Avery', totalQty: 5 },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  let added = 0;
  for (const { isbn, ...rest } of books) {
    const res = await Book.updateOne(
      { isbn },
      { $setOnInsert: { ...rest, availableQty: rest.totalQty } },
      { upsert: true }
    );
    if (res.upsertedCount) added++;
  }
  console.log(`Seed finished: ${added} added, ${books.length - added} already existed`);
  await mongoose.disconnect();
})();