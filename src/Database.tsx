import SQLite from 'react-native-sqlite-storage';

var db : SQLite.SQLiteDatabase;
export const openDatabase = () => {
    db = SQLite.openDatabase(
      {
        name: 'little_lemon',
        location: 'default',
        createFromLocation: '~littlelemon.db',
      },
      () => { },
      error => {
        console.log("ERROR: " + error);
      }
    );
}

export const closeDatabase = () => {
  try{
    db.close()
  } catch(error){
    console.log(error)
  }
}

export function fetchMenufromDB(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM menu', [], (tx, results) => {
        var len = results.rows.length;
        const result = [];
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            const item = {
              category: row.category,
              description: row.description,
              image: row.image,
              name: row.name,
              price: row.price,
            };
            result.push(item);
          }
        }
        resolve(result);
      });
    }, (error) => {
      console.log(error)
      reject(error)
    });
  });
}
export function setMenuToDB(data: any[]){
  var isError = false
  db.transaction((tx) => {
    for(var i=0; i< data.length; i++){
      if (isError) break;
      tx.executeSql(`INSERT INTO menu (category,description,image,name,price) VALUES (${data[i].category},${data[i].description},${data[i].image},${data[i].name},${data[i].price})`
        ,[]).catch((error) => {
          isError = true
          console.log(error)
        })
    }
  })
}