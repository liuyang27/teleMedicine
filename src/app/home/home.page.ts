import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  records:any=[];
  constructor(private db: DatabaseService) {
    this.db.getDatabaseState().subscribe(rdy=>{
      if (rdy) {
        console.log("database ready and get names>>>>>>>>>>>")
        this.db.getAllRecords().subscribe(data=>{
          this.records=data;
        })
      }
    })
  }

  ngOnInit(): void {
    this.db.getAllRecords().subscribe(data=>{
      this.records=data;
    })
  }  
  
  deleteRecordById(id){
    this.db.deleteRecordById(id).then(()=>{
      this.db.getAllRecords().subscribe(data=>{
        this.records=data;
      })
    })
  }
  getDetailsById(id){
    console.log(id)
  }




}
