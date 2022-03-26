import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.css']
})
export class ActionFormComponent implements OnInit {


  title = 'Record Activity';
  @Input() entityType: string;
  @Input() entityId: number;
  workspace: any;
  working: boolean;
  today = new Date().toISOString().substring(0, 10); // today - for maximum value of datepicker
  date = new Date().toISOString().substring(0, 10);

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  enter(form: any): void {

    this.working = true;
    this.dataService.insertRelated(this.entityType, this.entityId, 'action', form.value).subscribe(
      (data) => {
        console.log(data);
        this.dataService.registerUpdate();
        this.working = false;
        const savedDate = form.value.date.valueOf();
        form.reset();
        form.controls.date.setValue(savedDate);
      },
      () => {this.working = false; },
      () => {this.working = false; }
    );
  }



}
