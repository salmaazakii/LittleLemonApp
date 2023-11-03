import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true)
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
  try {
    db.close()
  } catch(ex){
    console.log(JSON.stringify(ex))
  }
}

export function fetchMenufromDB(filterCategories: [],filterName: string = ''): Promise<any[]> {
  var filterQuery: string = ''
  filterQuery = (filterCategories.length > 0 ? "category IN ('" + filterCategories.join("','") + "')" : '')
  if (filterName !== ''){
    filterQuery = (filterQuery === '' ? '' : ' AND ') + "name like '%" + filterName + "%'"
  }

  var query = 'SELECT * FROM menu' + (filterQuery === '' ? '' : ' WHERE ' + filterQuery)

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
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
        console.log(result)
        resolve(result);
      });
    }, (error) => {
      // console.log(error)
      reject(error)
    });
  });
}
export function setMenuToDB(data: any[]){
  var isError = false
  console.log('setMenuToDB')
  openDatabase()
  db.transaction((tx) => {
    for(var i=0; i< data.length; i++){
      if (isError) break;
      console.log(data)
      tx.executeSql(`INSERT INTO menu (category,description,image,name,price) VALUES (?,?,?,?,?)`
        ,[data[i].category,data[i].description,data[i].image,data[i].name,data[i].price],
        (tx,result) => {
          console.log('Query completed', result.rowsAffected);
        },(tx, error) => {
          // this is the error callback
          console.log('Query failed', error);
        })
    }
  })
}