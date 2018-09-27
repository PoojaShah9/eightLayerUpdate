import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class NotificationService {

  constructor(private httpClient: HttpClient) { }
  getLesson(id) {
    return this.httpClient.get<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lesson?entid=" + id);
  }
  getQuizSchedule(id) {
    return this.httpClient.get<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quiz-schedule?entid=" + id);
  }
}
