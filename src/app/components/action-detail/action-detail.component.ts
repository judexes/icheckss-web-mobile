import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls: ['./action-detail.component.css']
})
export class ActionDetailComponent implements OnInit {

  isLoading: boolean;
  action: any;
  tabIndex = 1;


  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.load(id);
    });
  }

  load(actionId: number): void {
    this.isLoading = true;
    this.find('action', actionId);
  }

  find(s: string, i: number): any {
    this.dataService.loadRecord(s, i).subscribe(
      (response: HttpResponse<any>) => {
        this.action = response.body;
        console.log(response.body);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  setTab(index: number): void{
    this.tabIndex = index;
  }


}
