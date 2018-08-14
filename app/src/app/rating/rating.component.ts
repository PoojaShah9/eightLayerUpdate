import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import 'path';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  rate = false;
  inputName: string;
  sad = `dirname + /src/assets/img/sad.png`;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    alert(rating);
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
  closeModel(){
    this.rate = false;
  }
  saveRating(){
    alert('submit');
  }
}
