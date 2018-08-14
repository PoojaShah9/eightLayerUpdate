import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  showSpinner:boolean = false;
  lessenDatas:any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.showSpinner = true;
    this.httpClient.get('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/lessoncount/chapters',
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    })
    .subscribe(data => {
      console.log(data);
      this.lessenDatas = data
      console.log("this.lessenDatas" , this.lessenDatas);
      this.showSpinner = false;
      //this.Edata = Array.of(this.Edata);
    });

  }

}
