import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

// create connection to db
const db = await openDB('jate', 1);
// create a transaction to write data to database and read data from database
const tx = db.transaction('jate', 'readwrite');
// open desired object stored in db
const store = tx.objectStore('jate');
// store conetnet to db
const request = store.put( { id: 1, value: content } );
// if request is sucessful
const result = await request;
console.log(result);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
