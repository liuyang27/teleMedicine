import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  allRecords = new BehaviorSubject([]);
  constructor(private plt: Platform,private sqlite: SQLite) {
   
    this.plt.ready().then(() => {
      console.log("platform is ready...")
      
      this.sqlite.create({
        name: 'patient.db',
        location: 'default'
      }).
        then((db: SQLiteObject) => {
          this.database = db;
          let sql = "CREATE TABLE IF NOT EXISTS table_records(id INTEGER PRIMARY KEY AUTOINCREMENT,q1 TEXT,q2 TEXT,q3 TEXT,q4 TEXT,q5 TEXT,q6 TEXT,q7 TEXT,q8 TEXT,q9 TEXT,q10 TEXT,createdDateTime TEXT)";
          db.executeSql(sql, [])
          .then(() => {
            console.log("create table ok >>>>>>>>>>>>>>>>>")
            this.loadAllRecords();
            this.dbReady.next(true);
            
          })
          .catch((err) => {
            console.log("create table error >>>>>>>>>>>>>>>>>>>>>>")
            console.log(err)
          });
        })
        .catch((err) => {
          console.log("create db error >>>>>>>>>>>>>>>>>>>>>>")
          console.log(err)
        });
    });
  }


  loadAllRecords(){
    console.log("get all records function>>>>>>>>>")
    return this.database.executeSql("select id,createdDateTime from table_records order by id desc",[])
    .then((data)=>{
      let records:any=[];
      if (data.rows.length > 0) {
        console.log("database got contents...")
        for (var i = 0; i < data.rows.length; i++) {
          console.log(data.rows.item(i).id)
          records.push({ 
            id: data.rows.item(i).id,
            createdDateTime: data.rows.item(i).createdDateTime,
          });
        }
      }
      this.allRecords.next(records)
    })
    .catch((err)=>{
      console.log("get all records error>>>>>>>>>>>")
      console.log(err)
      return []
    })
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getAllRecords(): Observable<any[]> {
    return this.allRecords.asObservable();
  }

  addRecord(data){
    console.log("add record function>>>>>>>>>")
    let sql="INSERT INTO table_records (q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,createdDateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    return this.database.executeSql(sql,data)
    .then(()=>{
      console.log("add new record ok")
      this.loadAllRecords();
    })
    .catch(e=>{
      console.log("add new record error>>>>>>>>>>>>>>")
      console.log(e)
    })
  }

  deleteRecordById(id){
    let sql="DELETE FROM table_records WHERE id=?";
    return this.database.executeSql(sql,[id])
    .then(()=>{
      console.log("delete record ok>>>>>>>>>>>>>>")
      this.loadAllRecords();
    })
    .catch(e=>{
      console.log("delete record error>>>>>>>>>>>>>>")
      console.log(e)
    })
  }

  getRecordById(id): Promise<any> {
    return this.database.executeSql('SELECT * FROM table_records WHERE id = ?', [id]).then(data => {
      return {
        q1: data.rows.item(0).q1,
        q2: data.rows.item(0).q2,
        q3: data.rows.item(0).q3,
        q4: data.rows.item(0).q4,
        q5: data.rows.item(0).q5,
        q6: data.rows.item(0).q6,
        q7: data.rows.item(0).q7,
        q8: data.rows.item(0).q8,
        q9: data.rows.item(0).q9,
        q10: data.rows.item(0).q10,
        createdDateTime: data.rows.item(0).createdDateTime,
      }
    });
  }

















}
