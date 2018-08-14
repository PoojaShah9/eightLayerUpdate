import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {count} from 'rxjs/operators/count';
import {ObjNgFor} from '../client-enterprise/myPipe';
//import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {ajaxGetJSON} from "rxjs/observable/dom/AjaxObservable";
import {yellow} from "@angular-devkit/core/src/terminal/colors";


@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})
export class QuizeComponent implements OnInit {
  public myForm: FormGroup;
  quizeData: any;
  showSpinner: boolean = false;
  entId: any;
  msg;
  any
  userID: any
  quizStatus = "Not Started"
  quizeQuestion: any;
  count = 0;
  myQuizquestion: any
  Qlength: any;
  answerData = [];
  option: any
  compareData: any;
  currentAns: any;
  myIndex: any;
  display = 'none';
  message: any;
  currectAnswer: any;
  currectAnswerdata: any
  currentType: any
  isValid: boolean = true;
  type2Data = [];
  finalLessonData: any
  finalLessonDataName: any;
  myValue: any;
  currentChapterCode: any
  selection;
  QuizScheduleId: any
  userLevel: any
  type2DynamicData: any;
  quizeIdData: any;
  isAvailable = true;
  redClassBool = true;
  finalType2Answers = []
  finalType2Index = []
  type2Index: any;
  questionSection: boolean = true;
  disableQuestion: boolean = false;
  isFound: boolean = true;
  private saveUsername: boolean = true;
  public data;
  ratingModelShow: boolean = false;
  ratingClicked: number;
  rating: number;
  id: number;
  constructor(private httpClient: HttpClient, private _fb: FormBuilder, private router: Router) {


  }

  // Quize start
  quizStart(quizScheduleId) {
    console.log("quizScheduleId = " + quizScheduleId);
    this.myIndex = !this.myIndex
    this.questionSection = false;
    this.showSpinner = true;
    this.userID = localStorage.getItem("userId");
    this.httpClient.put('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/quizzes/' + this.entId + '/users/' + localStorage.getItem("Updated_user_id") + '/' + quizScheduleId + "_" + localStorage.getItem("Updated_user_id"),
      JSON.stringify({

        quiz_schedule_id: quizScheduleId,
        scheduled_status: "Running"

      }),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )
      }
    ).subscribe((data: any) => {
      this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/questions/' + this.entId + '/' + quizScheduleId + '',
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
        }).subscribe(data => {
        this.quizeQuestion = data
        console.log("i am calling-->")
        /*that is giving number of answer*/
        this.option = 0

        this.currentType = this.quizeQuestion.data[0].question_type;
        this.currentChapterCode = this.quizeQuestion.data[0].chapter_code;

        /*start show lessons*/
        this.showSpinner = true;
        this.entId = localStorage.getItem("enterpriseId");

        this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.currentChapterCode,
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
          }).subscribe(data => {

          let lessonData;
          lessonData = data
          console.log(lessonData);
          this.finalLessonData = lessonData.data.chapter_lesson
          this.finalLessonDataName = lessonData.data.chapters_name

          this.showSpinner = false;
          //this.Edata = Array.of(this.Edata);
        }, (error: any) => {

          console.log("error = " + error);

        })
        /*end show lessons*/

        if (this.currentType == "1") {

          this.isValid = true;
        } else {

          this.isValid = false;

        }
        for (data in this.quizeQuestion.data[0].question_options) {


          this.option = this.option + 1
          this.answerData[this.option - 1] = this.quizeQuestion.data[0].question_options[this.option - 1].name

        }

        /*this is give the answer*/

        this.Qlength = this.quizeQuestion.data.length
        this.myQuizquestion = this.quizeQuestion.data[0].question
        //this.quizStatus = "Running"
        this.showSpinner = false;
      }, (error: any) => {
        console.log("error in inner = " + error.message);
      })
      this.showSpinner = false;

    }, (error: any) => {
      console.log("error of enterprise = " + error.message);
      this.showSpinner = false;
    })
  }

  //for Question increment
  questionNext() {
    this.entId = localStorage.getItem("enterpriseId");
    this.disableQuestion = false;
    this.display = 'none';
    this.count = this.count + 1;

    if (this.count >= this.Qlength) {
      this.userID = localStorage.getItem("userId");

      //for complete status
      this.showSpinner = true;
      this.httpClient.put('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/quizzes/' + this.entId + '/users/' + localStorage.getItem("Updated_user_id") + '/' + this.QuizScheduleId + "_" + localStorage.getItem("Updated_user_id"),
        JSON.stringify({
          quiz_schedule_id: this.QuizScheduleId,
          scheduled_status: "Completed"

        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {
        console.log(data);
        this.ratingModelShow = true;
        /*questionsengagement*/

        this.httpClient.post('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/' + this.entId + '/users/' + this.userID + '/quizzes/' + this.QuizScheduleId + '/questionsengagement',
          {},
          {

            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))

          }).subscribe(data => {

          console.log("questionsengagement is calling==>", data)
          this.ratingModelShow = true;
          this.showSpinner = false;
        }, (error: any) => {

          console.log("error = " + error);

        })
        /* userlevel */

        this.httpClient.post('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/' + this.entId + '/users/' + this.userID + '/quizzes/' + this.QuizScheduleId + '/userlevel',
          {},
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
            )
          }
        ).subscribe((data: any) => {

          let userLevel
          userLevel = data;
          this.userLevel = userLevel.data.user_level
          console.log("userLevel is calling==>", this.userLevel);
          this.showSpinner = false;
          this.redClassBool = true;


        }, (error: any) => {

          console.log("error of enterprise == " + error.message);
        })


        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of enterprise = " + error);
      })


      this.quizStatus = "Complete";
      this.questionSection = true;

    } else {


      this.myQuizquestion = this.quizeQuestion.data[this.count].question

      //for options
      this.myIndex = !this.myIndex
      this.answerData = [];
      this.option = 0

      this.currentType = this.quizeQuestion.data[this.count].question_type;

      if (this.currentType == "1") {

        this.isValid = true

      } else {

        this.isValid = false
      }
      for (let data in this.quizeQuestion.data[this.count].question_options) {

        this.option = this.option + 1
        this.answerData[this.option - 1] = this.quizeQuestion.data[this.count].question_options[this.option - 1].name

      }

    }

  }

  selectedAnswer(answer, index, target) {
    console.log("target", target);
    this.myValue = answer
    this.myIndex = index
    this.currentAns = answer
  }

  selectedAnswertype2(answer: string, isChecked, finalIndex) {
    console.log("i = " + finalIndex);
    console.log("answer = " + answer);
    this.finalType2Answers.push(answer)
    this.finalType2Index.push(finalIndex)
    /*
      this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
        JSON.stringify({
          "answer":
            ansObj
        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {

        this.display = 'block';
        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of enterprise" + error);
      });
    */
    // console.log("answer: ", answer , "isChecked" , isChecked, "this.type2Data", this.type2Data);
    let index;
    if (this.type2Data.length === 0) {
      this.type2Data.push(answer);
      isChecked.target.checked = true;
    }
    else {
      const result = this.type2Data.find(function (element) {

        return element === answer;
      });


      if (result === 'undefined' || typeof result == "undefined") {
        this.type2Data.push(answer);
        isChecked.target.checked = true;
      } else {
        let index = this.type2Data.findIndex(x => x == answer);
        this.type2Data.splice(index, 1);
        isChecked.target.checked = false;
      }
    }
    console.log("this.type2Data: ", this.type2Data);
  }

  findIsChecked(value) {

    if (this.type2Data.length > 0) {
      const result = this.type2Data.find(function (element) {
        return element === value;
      });
      if (result === 'undefined' || typeof result == "undefined")
        return false;
      else
        return true;

    } else {
      return false;
    }
  }

  findIndexToUpdate(answer) {
    return answer === this;
  }


  submitAnswer() {
    this.showSpinner = true;

    //  if (this.currentAns) {

    this.disableQuestion = true;
    if (this.currentType == "1") {
      /*for type1 start*/
      let ansID = this.myIndex;
      let ansObj = {};
      ansObj[ansID] = this.currentAns;

      this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
        JSON.stringify({
          "answer":
          ansObj
        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {

        this.display = 'block';

        /*for right answer*/
        this.httpClient.get('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.quizeQuestion.data[this.count].chapter_code + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/answers',
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
          }).subscribe(data => {

          console.log(data);
          this.currectAnswerdata = data

          this.currectAnswer = "";
          for (let ans in this.currectAnswerdata.data[0].answer) {

            this.currectAnswer = this.currectAnswerdata.data[0].answer[ans]
          }

          if (this.currectAnswer == this.currentAns) {

            this.message = "Correct Answer"
            this.currentAns = "";
          } else {

            this.message = "Incorrect Answer"
            this.currentAns = "";
          }


        }, (error: any) => {

          console.log("error = " + error);

        })

        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of enterprise" + error);
      });
      /*for type1 end*/
    }
    else {
      /*type 2 solutions*/
      let objAns = {};

      this.httpClient.get('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.quizeQuestion.data[this.count].chapter_code + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/answers',
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
        }).subscribe(data => {
        console.log("type 2 data");
        this.compareData = data
        let obj1 = {}
        obj1 = this.compareData.data[0].answer

        console.log("saved answer = ", obj1);
        this.display = 'block';
        this.showSpinner = false;
        const answer1 = [];
        let obj2 = [];
        obj2 = this.type2Data
        console.log("inputed data", obj2)
        let wrong = 0;

        for (let key in obj1) {

          answer1.push(obj1[key]);

        }

        for (let i = 0; i < obj2.length; i++) {


          if (answer1.indexOf(obj2[i]) != -1) {
            console.log("found");
            this.isFound = false;
            this.currectAnswer = answer1;
          }
          else {

            console.log("not found");
            this.isFound = true;
            this.currectAnswer = answer1;
            wrong = wrong + 1

          }

        }
        if (wrong > 0) {

          this.message = "Incorrect Answer"

        } else {

          this.message = "Correct Answer"
        }
        /*for type2 start*/

        console.log("finalType2Answers", this.finalType2Answers, "index", this.finalType2Index);

        console.log("this.finalType2Answers.length", this.finalType2Answers.length);

        for (let i = 0; i < this.finalType2Index.length; i++) {

          for (let j = 0; j < this.finalType2Index.length; j++) {

            console.log(this.finalType2Index[i], this.finalType2Answers[j]);

            objAns[this.finalType2Index[j]] = this.finalType2Answers[j]

          }

        }

        /*type 2 save answer*/
        console.log("finallllllll  answerrr  = ", objAns);
        this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
          JSON.stringify({
            "answer":
            objAns
          }),
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
            )
          }
        ).subscribe((data: any) => {

          console.log("data", data);
          this.display = 'block';
          this.type2Data = [];
          this.finalType2Answers = [];
          this.finalType2Index = [];
          this.showSpinner = false;

        }, (error: any) => {

          console.log("error of enterprise" + error.message);
        });

      }, (error: any) => {

        console.log("error = " + error);

      })
      //---
      console.log("answer", objAns)


//-----
    }
  }

  /* onChange(email: string, event: boolean) {

    const emailFormArray = <FormArray>this.myForm.controls.Type2options;
    console.log(event);
   if (event) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
    }
  }*/
  ngOnInit() {

    this.showSpinner = true;
    this.entId = localStorage.getItem("enterpriseId");


    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/quizzes/' + this.entId,
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe(data => {
      console.log("quize data =====>");
      console.log(data);
      this.quizeData = data;
      this.QuizScheduleId = this.quizeData.data[0].quiz_schedule_id;
      console.log("this.QuizScheduleId", this.QuizScheduleId);
      this.showSpinner = false;

    }, (error: any) => {
      this.router.navigateByUrl('/');
      console.log("error = " + error.message);

    })
    this.userID = localStorage.getItem("Updated_user_id");
    console.log("this.userID", this.userID)
    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/userquizquestions/' + this.entId + '/' + localStorage.getItem("Updated_user_id"),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe(data => {
      console.log("data=============", data);
      this.quizeIdData = data;
      if (this.quizeIdData.data == "") {
        this.showSpinner = false;
        alert("you have no quiz scheduled right now..!");
      } else {
        this.showSpinner = false;
        this.quizStart(this.quizeIdData.data[0].quiz_schedule_id);

      }

    }, (error: any) => {

      console.log("error = " + error);

    })

    this.myForm = this._fb.group({
      Type2options: this._fb.array([])
    });
  }


  // testing(temp1:any) {

  // }
  showMyPop() {
    this.redClassBool = false;
  }

  hideQuizepopUp() {
    this.redClassBool = true;
  }
  ratingComponentClick(clickObj: any): void {
      this.ratingClicked = clickObj.rating;
      setTimeout(()=>{
        this.ratingModelShow = false;
      },5000);

  }


}
