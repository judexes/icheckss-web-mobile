import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DataService } from 'src/app/services/data.service';
import { HttpResponse } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {


  workspace: any;
  spaces = [];
  activeSpaceId: number;
  isLoading: boolean;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.activeSpaceId = this.route.firstChild?.snapshot.params.id;
        }
      });
    }

  ngOnInit(): void {

    this.workspace = this.workspaceService.getCurrentWorkspaceValue();

    this.checkWorkspace(this.workspace);

    this.index('space');
  }

  onAddListingClicked(): void {
    const data = { mode: 'add', space_id: this.activeSpaceId };
    this.modalService.LoadModal('listing', data);
  }

  onEditSpaceClicked(): void {
    const data = { id: this.activeSpaceId, mode: 'edit' };
    this.modalService.LoadModal('space', data);
  }

  onAddSpaceClicked(): void {
    const data = { id: this.activeSpaceId };
    this.modalService.LoadModal('space', data);
  }

  onReloadClicked(): void {
    this.index('space');
  }


  load(parentId: number, index: number): any {
    this.list('space', parentId, 'space', index);
  }


  list(entity: string, id: number, subentity: string, index: number): any {
    this.dataService.loadRelated(entity, id, subentity).subscribe(
      (response: HttpResponse<any>) => {
        this.spaces[index].spaces = response.body;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      }
    );
  }


  index(s: string): any {
    this.isLoading = true;
    this.dataService.loadIndex(s).subscribe(
      (response: HttpResponse<any>) => {
        this.spaces = response.body;
        console.log(response.body);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => this.isLoading = false
    );
  }

  checkWorkspace(workspace: any): void {
    if (workspace == null){
      this.router.navigate(['home']);
    }
  }

  onSpaceIdEmitted(id: number): void {
    if (id){
      this.router.navigate(['/properties', id ]);
    }
  }

}
