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
  rowSelected;
  obj: any = [];
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

  openCloseRow(id) {
    this.rowSelected = id;
    console.log('rowSelected' , this.rowSelected);
    this.obj = [{
      id: this.rowSelected
    }];
    console.log('obj', this.obj);

  }

}
