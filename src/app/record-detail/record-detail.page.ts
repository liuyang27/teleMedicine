import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage implements OnInit {

  constructor(private db: DatabaseService,
    private route: ActivatedRoute,
    public http: HttpClient,) { }

  questionArray: any;
  answerArray: any = [];
  record: any = null;
  qrData: any = null;
  answerString: any="";

  ngOnInit() {
    let _url: string = "/assets/data/questions.json";
    this.http.get(_url, { responseType: "json" }).subscribe((res: any) => {
      this.questionArray = res;
    })

    this.route.paramMap.subscribe(params => {
      let recordId = params.get('id');
      this.db.getRecordById(recordId).then(data => {
        this.record = data;
        for (var key in this.record) {
          this.answerArray.push(this.record[key]);
          this.answerString = this.answerString + this.record[key] + "|$|";
        }
        this.answerString = this.answerString + "John Doe";
        this.qrData = this.answerString
      });
    });

  }


}
