import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class NotificationService {

  constructor(private httpClient: HttpClient) { }
 getLesson() {
   return this.httpClient.get("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lesson");
 }
  getQuizSchedule() {
    return this.httpClient.get("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quiz-schedule");
  }
}
