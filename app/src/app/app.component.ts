import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {NotificationService} from "../services/notification.service";
declare var notification: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  // hideVar:boolean
   constructor(private httpClient:HttpClient,
               private notificationService: NotificationService){


   }
   sessionStorage():any{

      //alert("asdadsaasdadasdasda");
      sessionStorage.removeItem("accessToken");
     }

  ngOnInit() {
    // new notification();
    this.notificationService.getLesson().subscribe(data => {
      if(data){
        new notification('Lesson Notification',"There is a lesson prepared and ready for you." +
          "Take 5 Minutes and complete the session." +
          "Do you want to take it now?");
      }

    });
    this.notificationService.getQuizSchedule().subscribe(data => {
      if(data) {
        new notification('Quize Notification',"There is a quize prepared and ready for you." +
          "Take 5 Minutes and complete the session." +
          "Do you want to take it now?");
      }
    });
    console.log('login page');
  }
    //console.log("app.component is calling");
    // this.hideVar = true;

  }
