import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  isLoading: boolean;
  isDownLoading: boolean;
  space: any;
  tabIndex = 0;
  id: number;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
                router.events.subscribe((val) => {
                  if (val instanceof NavigationEnd){
                    this.id = this.route.snapshot.params.id;
                    this.load(this.id);
                  }
                });
              }

  ngOnInit(): void {


    this.dataService.dataUpdate$().subscribe(
      (v) => {
        this.load(this.id);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
        this.isLoading = false;
      },
      () => this.isLoading = false
    );

  }

  load(spaceId: number): void {

    this.isLoading = true;
    this.find('space', spaceId);
  }

  find(s: string, i: number): any {
    this.dataService.loadRecord(s, i).subscribe(
      (response: HttpResponse<any>) => {
        this.space = response.body;
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
