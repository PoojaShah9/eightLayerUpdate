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
  chapterData = [{
    'chapter_code': "58ccbc50-340a-11e8-97d5-67da98e68c66",
    'lesson_id': "1",
    'lesson_name': "lesson1",
    'lesson_schedule':{
      'chapter_code':"58ccbc50-340a-11e8-97d5-67da98e68c66",
      'chapter_lesson':"A malicious email can look just like it comes from a financial institution, an e-commerce site, a government agency or any other service or business.↵It often urges you to act quickly, because your account has been compromised, your order cannot be fulfilled or there is another urgent matter to address.↵If you are unsure whether an email request is legitimate, try to verify it with these steps:↵    • Contact the company directly – using information provided on an account statement, on the company’s official website or on the back of a credit card (if it is your credit card company is contacting you).↵    • Search for the company online – but not with information provided in the email.",
      'chapters_name':"Email Security",
      'date_time':"2018-04-03T00:52:22.735Z",
      'entid':"12333",
      'lesson_no':"1",
      'lesson_schedule_id':"58ccbc50-340a-11e8-97d5-67da98e68c66_12333",
      'question_amount':"3",
      'scheduled_date':"2018-08-27"
    }
  },
    {  'chapter_code': '58ccbc50-340a-11e8-97d5-67da98e68c66',
      'lesson_id': '2',
      'lesson_name': 'lesson2'
    },
    {  'chapter_code': '58ccbc50-340a-11e8-97d5-67da98e68c66',
      'lesson_id': '3',
      'lesson_name': 'lesson3'
    }]
  quizeData: any =[];
  chapterName:any =[];
  Entdatas: any =[];
  editLessonData: any =[];
  entid;
  chapterid;
  onDownClick = false;
  constructor(private httpClient: HttpClient,
              private lessonScheduleService: LessonScheduleService) { }

  ngOnInit() {
    this.showSpinner = true;
    console.log('llllllll', this.chapterData);
    // console.log('llllllll', this.chapterData[lesson_data]);
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
  }
  onChapterChange(event) {
    this.chapterid = event;
    console.log('oooooooooooooo',this.chapterid );
    this.showSpinner = true;
   /* this.lessonScheduleService.getLessonData(this.entid,this.chapterid)
      .subscribe(response => {
        console.log(response);
        this.showSpinner = false;
        this.chapterData = response.body.data;
      });*/

    // this.lessonScheduleService.getQuizData(this.entid,this.chapterData.lesson_schedule_id)
    //   .subscribe(response => {
    //     this.showSpinner = false;
    //       this.quizeData = response.body.data;
    //       console.log('lllllllllllll', this.quizeData);
    //   })
  }

  addChapters(data) {
    this.editLessonData = data;
  }
}
