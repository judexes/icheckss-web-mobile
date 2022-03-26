import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {


  @Input()
  media = [];

  activeIndex: number;

  constructor() { }

  ngOnInit(): void {
    this.activeIndex = 0;
  }

  loadItem(selectedIndex: number): void{
    this.activeIndex = selectedIndex;
  }

}
