import { openDB } from 'idb';

const initdb = async () =>
//new database named jate, version 1 
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

// DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('post to database');
  const contactDb = await openDB('jate', 1); 
  //gives write priviledges, allowing user to modify and create data
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add(content);

  const result = await request;
  console.log('data saved to database! :)', result);
};

// DONE: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Creates a connection to the database
  const contactDb = await openDB('jate', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Opens the desired object store.
  const store = tx.objectStore('jate');

  // gets all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
