import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questionData:any;
  errorMessage:any;
  lessonId: any;
  private sub: any;
  showSpinner:boolean = false;
  chapname:any
  DeleteQuestionID:any
  constructor(private httpClient: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.showSpinner = true;
    this.sub = this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.chapname = params['chapname'];
    });
  //  alert("lessonId = "+ this.lessonId+"this.chapname = "+this.chapname);
    this.httpClient.get('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.lessonId+'/questions',{
     
               headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
             }).subscribe(
               result => {
                 this.questionData = result
                 console.log(this.questionData);      
                 this.showSpinner = false;
                 
               }),
               error => this.errorMessage = error
               this.showSpinner = false;
   
  }
  deleteQuestion(QuestionId:any){

//alert("QuestionId = "+QuestionId)
this.DeleteQuestionID = QuestionId;

  }

  QuestionRemoveData(){

//alert("QuestionId = "+this.DeleteQuestionID);
//alert("chapterId = "+ this.lessonId);
this.showSpinner = true;
this.httpClient.delete('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.lessonId+'/questions/' + this.DeleteQuestionID,{

  headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
}).subscribe(
  result => {

    console.log(result)
    this.ngOnInit();
    this.showSpinner = false;
    
  },
  error => this.errorMessage = error
); 

  }
}
