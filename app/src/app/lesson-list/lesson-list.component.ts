import { Component, OnInit } from '@angular/core';
import {HttpClient} from "../../../node_modules/@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {LessonScheduleService} from "../../services/lesson-schedule.service";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  chapterId: any;
  entid: any;
  private sub: any;
  showSpinner:boolean = false;
  chapname:any;
  lessonData: any = [];
  constructor(private httpClient: HttpClient,private route: ActivatedRoute,
              private lessonScheduleService: LessonScheduleService) { }
  ngOnInit() {
    this.showSpinner = true;
    this.sub = this.route.params.subscribe(params => {
      this.chapterId = params['chapterId'];
      this.entid = params['entid'];
    });
    this.lessonScheduleService.getLessonSchedule(this.entid,this.chapterId)
      .subscribe((response) => {
        console.log('response', response);
        this.lessonData = response.body.data;
        this.showSpinner = false;
      })

  }

}
