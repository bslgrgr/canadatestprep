import { openDB } from 'idb';

const DB_NAME = 'quizApp';
const STORE_NAME = 'quizState';

const dbPromise = typeof window !== 'undefined' ? openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
}) : null;

export const saveState = async (key: string, value: any) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.put(STORE_NAME, value, key);
};

export const loadState = async (key: string) => {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return await db.get(STORE_NAME, key);
};

export const clearState = async () => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.clear(STORE_NAME);
};
