import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LessonScheduleService {

  constructor(private httpClient: HttpClient) { }

  addLesson(data) {
    return this.httpClient.post<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lessons", data);
  }

  getLessonData(entid, chapterid) {
   return this.httpClient.get<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lessonschedule?entid=" + entid + "&chapter_code=" + chapterid );
  }
  getQuizData(entid, lessonid) {
   return this.httpClient.get<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quizeschedule?entid=" + entid + "&lesson_schedule_id=" + lessonid );
  }

}
