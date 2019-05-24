import { TestBed, inject } from '@angular/core/testing';

import { LessonScheduleService } from './lesson-schedule.service';

describe('LessonScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonScheduleService]
    });
  });

  it('should be created', inject([LessonScheduleService], (service: LessonScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
