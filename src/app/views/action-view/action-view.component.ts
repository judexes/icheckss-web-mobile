import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.css']
})
export class ActionViewComponent implements OnInit {

  title = 'Edit Property';
  @Input() id: number;
  isWorking: boolean;
  action: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void{

    this.isWorking = true;
    this.dataService.loadRecord('action', this.id).subscribe(
      (response: HttpResponse<any>) => {
        this.action = response.body;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {
        this.isWorking = false;
      }
    );
  }

  splitUserName(s: string): string[]{
    return s.split(':');
  }

}
