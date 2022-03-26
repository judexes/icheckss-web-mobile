import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Home';
  actions = [];
  workspaces = [];
  noWorkspaces = false;
  isLoading: boolean;


  constructor(
    private workspaceService: WorkspaceService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.workspaceService.getWorkspaces().subscribe(
      (response: HttpResponse<any>) => {
        this.workspaces = response.body;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
        this.isLoading = false;
      },
      () => this.isLoading = false
    );

  }

  loadWorkspace(workspace: any): any {
    this.workspaceService.syncWorkspace(workspace);
    this.router.navigate(['listings']);
  }

}
