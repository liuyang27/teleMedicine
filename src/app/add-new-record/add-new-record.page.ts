import { Component, OnInit } from '@angular/core';
import { AnswerModel } from './answerMode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-new-record',
  templateUrl: './add-new-record.page.html',
  styleUrls: ['./add-new-record.page.scss'],
})
export class AddNewRecordPage implements OnInit {

  constructor(public http: HttpClient,
    private router: Router,
    private db: DatabaseService) { }


  qNumber: any;
  question: any;
  type: any;
  options: any;
  questionArray: any;
  answerArray: any;
  subQuestion: any;
  answerModel = new AnswerModel("", "");

  ngOnInit() {
    this.qNumber = 0;
    this.questionArray = [];
    this.answerArray = [];
    this.options = [];
    this.subQuestion = [];
    this.loadAllQuestions();
  }

  loadAllQuestions() {
    let _url: string = "/assets/data/questions.json";
    this.http.get(_url, { responseType: "json" }).subscribe((res: any) => {
      this.questionArray = res;
      this.question = this.questionArray[this.qNumber].question
      this.type = this.questionArray[this.qNumber].type
      this.options = this.questionArray[this.qNumber].options
      this.subQuestion = this.questionArray[this.qNumber].subQuestion
      this.answerModel = new AnswerModel("", this.options[0]);
    })
  }

  onSubmit() {
    var res = this.answerModel.data + " " + this.answerModel.type;
    console.log(this.answerModel)
    this.addAnswer(res)
    this.loadNextQuestion();
  }
  onSubmitTextarea() {
    console.log(this.answerModel)
    this.addAnswer(this.answerModel.data)
    this.loadNextQuestion();
  }
  btnClick(answer) {
    this.addAnswer(answer);
    if (this.qNumber >= this.questionArray.length - 1) {
      this.insertIntoDB()
    } else {
      this.loadNextQuestion();
    }
  }
  loadNextQuestion() {
    this.qNumber = this.qNumber + 1;
    this.question = this.questionArray[this.qNumber].question
    this.type = this.questionArray[this.qNumber].type
    this.options = this.questionArray[this.qNumber].options
    this.subQuestion = this.questionArray[this.qNumber].subQuestion
    this.answerModel = new AnswerModel("", this.options[0]);
  }
  addAnswer(answer) {
    this.answerArray.push(answer)
    console.log(this.answerArray)
  }
  loadPreQuestion() {
    this.answerArray.pop();
    this.qNumber = this.qNumber - 1;
    this.question = this.questionArray[this.qNumber].question
    this.type = this.questionArray[this.qNumber].type
    this.options = this.questionArray[this.qNumber].options
    this.subQuestion = this.questionArray[this.qNumber].subQuestion
    this.answerModel = new AnswerModel("", this.options[0]);
  }
  insertIntoDB() {
    console.log("insert into sqlite")
    var d=new Date().toLocaleString()
    this.answerArray.push(d)
    
    this.db.addRecord(this.answerArray).then(()=>{
      this.router.navigate(['/home']);
    })
    
  }





}
