import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  isLoading: boolean;
  entries: any;
  toolName: string;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
                router.events.subscribe((val) => {
                  if (val instanceof NavigationEnd){
                    this.toolName = route.firstChild?.snapshot.url[0].path;
                  }
                });
   }

  ngOnInit(): void {

  }

}
