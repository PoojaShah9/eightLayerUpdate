import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LessonScheduleService} from "../../services/lesson-schedule.service";
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  showSpinner: boolean = false;
  chapterData = [];
  display = "none";
  quizePopup = "none";
  selectedEntName;
  selectedchapterName;
  quizeData: any =[];
  chapterName:any =[];
  Entdatas: any =[];
  editLessonData: any =[];
  entid;
  chapterid;
  onDownClick = false;
  currentent: any;
  currentChapter: any;
  constructor(private httpClient: HttpClient,
              private lessonScheduleService: LessonScheduleService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(response => {
        this.Entdatas = response.data
        this.showSpinner = false;
        }, (error: any) => {
        console.log("error = " + error);

      })

    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(response => {
          this.chapterName = response.data;
          this.showSpinner = false;
        },
        (error: any) => {
          console.log("error of put" + error);
        })
  }

  onEntChange(event) {
    this.entid = event;
    this.Entdatas.filter((x) => {
      if(x.entid === event) {
        this.currentent = x;
        console.log('xxxxxxxxxx', this.currentent);
      }})
    console.log('entid', this.entid);
  }

  onChapterChange(event) {
    this.chapterid = event;
    this.chapterName.filter((x) => {
      if(x.chapter_code === event) {
        this.currentChapter = x;
      }
    });
    console.log('chapterid', this.chapterid);
    this.showSpinner = true;
    this.lessonScheduleService.getLessonSchedule(this.entid,this.chapterid)
      .subscribe(response => {
        this.showSpinner = false;
        if(response) {
          this.chapterData = response.body.data;
        } else {
          this.chapterData = [];
          alert('No Any Lesson Schedule Created');
        }
      });

    this.lessonScheduleService.getQuizData(this.entid,this.chapterid)
      .subscribe(response => {
        console.log('quizRecord', response);
        if (response.body.data.length > 0) {
          this.showSpinner = false;
          this.quizeData = response.body.data;
        } else {
          this.quizeData = [];
          alert('No Any Quize Schedule Created');
        }});
  }

  createLessonSchedule(data) {
    this.display = 'block';
    this.editLessonData = data;
    this.editLessonData.chapters_name = this.currentChapter.chapters_name;
    this.editLessonData.entname = this.currentent.entname;
    console.log('eeeeeeeeeeeeeeeeeeditLessonData', this.editLessonData);
  }
  close(){
    this.display = "none";
    this.quizePopup = 'none';
  }

  submitLessonSchedule(data,sDate) {
    console.log('qqqqqqqqqqqqqqqqqqqqqqdata', data);
    console.log('sDate', sDate);
    let lessonScheduleData = {
        "chapter_code": data.chapter_code,
        "chapter_lesson": data.lesson_detail,
        "chapters_name": data.chapters_name,
        "entid": this.currentent.entid,
        "scheduled_date": sDate,
        "lesson_no": data.lesson_no,
        "lesson_code": data.lesson_code
      };
    this.lessonScheduleService.addLessonSchedule(lessonScheduleData)
      .subscribe((response) => {
        console.log(response);
        alert('Lesson Schedule Successfully.');
      })
    this.editLessonData = [];
    this.display = 'none';
  }

  createQuizeSchedule() {
    this.quizePopup = 'block';
  }
  submitQuizeSchedule(data,qDate) {
    console.log('data', data);
    this.quizePopup = 'none';
    let quizeScheduleData =  {
      "entid": this.currentent.entid,
      "lessons_included": [
        data.chapter_code
    ],
      "scheduled_date": qDate,
      "chapter_code": data.chapter_code
    };
    this.lessonScheduleService.addQuizData(quizeScheduleData)
      .subscribe((response) => {
        console.log(response);
        alert('Quize Schedule Successfully.');
      })
  }
}
