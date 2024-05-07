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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('post db');
  const jateDB = await openDB('jate', 1);
  const trans = jateDB.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const request = store.add({ content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDB = await openDB('jate', 1);
  const trans = jateDB.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result', result);

  if (!result.length) {
    return null;
  }

  console.log('result content', result[result.length - 1].content);
  return result[result.length - 1].content;
};

initdb();
