import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
var SQLite = require('react-native-sqlite-storage')

const tableName = 'DummyData';
export const getDBConnection = async () => {
  

  return  SQLite.openDatabase({ name: 'data.db', location: 'default' });

};

export const createTable = async (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS dummyData (
    PersonID INTEGER PRIMARY KEY,
    LastName TEXT,
    FirstName TEXT,
    Address TEXT,
    City TEXT,
    Flag INTEGER,
    TimestampColumn TEXT,
    PdfContent BLOB,
    ImageContent BLOB
  )`;

  db.transaction((txn) => {
    txn.executeSql(query, [], (txn, result) => {
      console.log("result", result)
    })
  })

  // await db.executeSql(query);
};


export const saveTodoItems = async (db, todoItems) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  var insertData
  db.transaction((txn) => {
    txn.executeSql(insertQuery, [], (txn, result) => {
      console.log("resultinconsole", result)
      insertData = result

    })
  })
  console.log("inserdata", insertData)
  return insertData
};

export const deleteTodoItem = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db, tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName};`;

  try {
    await db.transaction(async (txn) => {
      await txn.executeSql(query, [], (txn, result) => {
        console.log(`Table ${tableName} deleted successfully.`);
      });
    });
  } catch (error) {
    console.error(`Error deleting table ${tableName}:`, error);
  }
};