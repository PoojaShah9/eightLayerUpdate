import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ObjNgFor } from '../client-enterprise/myPipe';
@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  showSpinner: boolean = false;
  chapterData: any;
  chapterName: any;
  display = "none";
  typeName: any;
  questionType: any;
  lessonNumberVal: any;
  editChapterData: any;
  editChapterName: any;
  editChapterLessonValue: any;
  editChaptersId: any;
  errorMessage: any;
  DeleteChaptersName: any;
  DeleteChaptersID: any;
  lesson_no: any;
  lessonNum: any;
  questionTypeForEdit: any;
  editTypeNumber: any
  currentChapIndx: any;
  questionTypeVal:any
  chapter: any;
  selectTypes: any;
  chaptersNameForQuestion: any;
  redClassBool: boolean = true;
  constructor(private httpClient: HttpClient, private router: Router) { }



  addNewChapter(name: any, question: any, lessonNumCount: any): any {


    if (name && question && lessonNumCount) {

      this.chapterName = name;
      this.questionType = question
      this.lessonNumberVal = lessonNumCount
      this.showSpinner = true;

      this.httpClient.post('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/',
        JSON.stringify({
          chapters_name: this.chapterName,
          chapter_lesson: this.questionType,
          question_type: this.typeName,
          lesson_no: this.lessonNumberVal

        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {

        this.showSpinner = false;
        this.redClassBool = true;
        this.chapterName = "";
        this.lessonNum = "";
        this.questionTypeVal = "";
        this.ngOnInit();

      }, (error: any) => {

        //this.router.navigateByUrl('/');
        console.log("error of enterprise" + error);
      })
    }
    else {

      this.redClassBool = false;


    }
  }
  selectchange() {

    this.typeName = 1;
  }
  selectchangeForEdit(args) {

    this.editTypeNumber = args.target.value;

  }

  currentChapterId(ChapType: any, chepId: any) {

    this.router.navigate(['type1', chepId]);
  }
  //getEdit Chapters
  editChapters(chapterId: any) {


    this.editChaptersId = chapterId
    this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + chapterId, {

      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe(
      result => {
        this.editChapterData = result

        this.editChapterName = this.editChapterData.data.chapters_name;
        this.editChapterLessonValue = this.editChapterData.data.chapter_lesson;
        this.lessonNum = this.editChapterData.data.lesson_no;
        this.questionTypeForEdit = this.editChapterData.data.question_type


      }),
      error => this.errorMessage = error

  }
  //edit
  editupdateData(chapNameVal: any, editQuestionType: any, lessonNumber: any) {

    /*chepter type from api*/

    console.log("this.editChaptersId = " + this.editChaptersId);
    this.showSpinner = true;

    this.httpClient.put(
      'https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.editChaptersId,
      JSON.stringify({
        chapters_name: chapNameVal,
        chapter_lesson: editQuestionType,
        lesson_no: lessonNumber,
        question_type: "1"

      }),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )
      }
    ).subscribe((data: any) => {

      console.log("data of put" + data);
      this.ngOnInit();
      this.showSpinner = false;

    }, (error: any) => {

      console.log("error of put" + error);
    })

  }
  //delete
  getDeleteChepName(deleteChepName: any, deleteChepId) {

    this.DeleteChaptersName = deleteChepName
    this.DeleteChaptersID = deleteChepId
  }
  ChapterRemoveData() {

    this.showSpinner = true;
    this.httpClient.delete('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.DeleteChaptersID, {

      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe(
      result => {
        alert("Deleted successfully");
        console.log(result)
        this.ngOnInit();
        this.showSpinner = false;

      },
      error => this.errorMessage = error
      );

  }
  //add Type
  currentChapter(chaptersName: any, currChepId: any, indx) {

    this.chapter = currChepId
    this.currentChapIndx = indx
    this.chaptersNameForQuestion = chaptersName

  }
  questionList(chapterQuestion) {

if(chapterQuestion){
  this.display = "none";
  this.router.navigate(['questionlist', chapterQuestion, this.chaptersNameForQuestion]);
}else{

this.display = "block";
  //alert("Please First select any chapter");
}
    
  }
  closeChapterPopup(){

    this.display = "none";

  }
  ngOnInit() {

    this.showSpinner = true;
    this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(data => {
        console.log(data);
        this.chapterData = data
        this.showSpinner = false;
      },
      (error: any) => {

        this.router.navigateByUrl('/');
        console.log("error of put" + error);
      })

  }

}
// this.router.navigateByUrl('/');